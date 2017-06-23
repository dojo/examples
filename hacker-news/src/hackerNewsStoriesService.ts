import { throttle } from '@dojo/core/util';
import StoreBase from '@dojo/stores/store/StoreBase';
import IndexedDBStorage, { IndexedDBOptions } from '@dojo/stores/storage/IndexedDBStorage';
import createFilter from '@dojo/stores/query/createFilter';
import Promise from '@dojo/shim/Promise';
import * as firebase from 'firebase';
import { Item } from "./HackerNewsAppContext";

interface TypeCount {
	type: story_type;
	count: number;
}

export type story_type = 'top' | 'new' | 'best' | 'ask' | 'show' | 'jobs';

const DB_NAME = 'dojo2HackerNewsPWA';
const STORY_TYPES: story_type[] = [ 'top', 'new', 'best', 'ask', 'show', 'jobs' ];
const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com/';
const ONE_DAY = 1000 * 60 * 60 * 24;
const MAX_COUNTS: { [ key in story_type ]: number } = {
	top: 500,
	new: 500,
	best: 500,
	ask: 200,
	show: 200,
	jobs: 200
};

function createStoryStoreConfig(): IndexedDBOptions<Item, any> {
	return {
		idProperty: 'order',
		indices: {
			order: true
		}
	}
}

function createStoryStore(view: story_type) {
	return new StoreBase<Item>({
		storage: new IndexedDBStorage<Item>({
			idProperty: 'order',
			dbName: DB_NAME,
			objectStoreName: view,
			indices: {
				order: true
			}
		})
	});
}

export const store = new StoreBase<Item>({
	storage: new IndexedDBStorage<Item>({
		version: 100,
		idProperty: 'order',
		dbName: DB_NAME,
		additionalStores: {
			counts: {
				idProperty: 'type',
				indices: {
					type: true
				}
			},
			best: createStoryStoreConfig(),
			new: createStoryStoreConfig(),
			jobs: createStoryStoreConfig(),
			ask: createStoryStoreConfig(),
			show: createStoryStoreConfig()
		},
		objectStoreName: 'top',
		indices: {
			order: true
		}
	})
});

const stores = STORY_TYPES.reduce(
	(stores, view) => {
		stores[view] = createStoryStore(view);

		return stores;
	},
	{} as { [ key in story_type ]: StoreBase<Item> }
);

export const countsStore = new StoreBase<TypeCount>({
	storage: new IndexedDBStorage<TypeCount>({
		dbName: DB_NAME,
		objectStoreName: 'counts',
		idProperty: 'type',
		indices: {
			type: true
		}
	})
});

const database = firebase.initializeApp({ databaseURL: HACKER_NEWS_API_BASE }).database();

function getStoryRef(type: story_type) {
	return database.ref(`/v0/${type === 'jobs' ? type.slice(0, -1) : type}stories`);
}

function getItem(index: number, id: string): Promise<Item | null> {
	return new Promise<Item | null>((resolve, reject) => {
		database.ref(`/v0/item/${id}`).once('value', (snapshot) => {
			const item: Item = snapshot.val();
			if (item) {
				item.order = index;
				item.updated = Date.now();
				resolve(item);
			}
			resolve(null);
		}, reject);
	});
}

export function getNumberOfStoriesForView(view: story_type): Promise<number> {
	return countsStore.get(view).then((count: TypeCount) => count && count.count || MAX_COUNTS[view]);
}

export function getStoriesForView(view: story_type, page: number, pageSize: number): Promise<Item[]> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	return stores[view].fetch(
			createFilter<Item>().greaterThanOrEqualTo('order', start).lessThan('order', end)
		).then((data) => {
			if (data.length) {
				return data;
			}
			return new Promise<Array<Item | null>>((resolve, reject) => {
				getStoryRef(view).once(
					'value',
					(snapshot) => {
						const ids: string[] = (snapshot.val() || []).slice(start, end);
						Promise.all(ids.map((id, index) => getItem(index, id))).then(resolve, reject);
					},
					reject
				);
			});
		});
}

const queuedUpdates = STORY_TYPES.reduce((queues, view) => {
	queues[view] = [];
	return queues;
}, {} as { [ key in story_type ]: Item [] });

const triggerUpdate =  throttle(() => {
	STORY_TYPES.forEach((view) => {
		const updates = queuedUpdates[view];
		if (updates.length) {
			stores[view].put(updates.splice(0))
		}
	});
}, 10);

function update(item: Item, view: story_type) {
	queuedUpdates[view].push(item);
	triggerUpdate();
}

export function startUpdates() {
	STORY_TYPES.forEach((type) => {
		stores[type].fetch(createFilter<Item>().lessThan('updated', Date.now() - ONE_DAY)).then((oldItems) => {
			oldItems.forEach((oldItem) => {
				const { order, id } = oldItem;
				getItem(order, id).then(
					(item) => {
						if (!item || item.deleted) {
							stores[type].delete(String(order));
						}
						else {
							update(item, type);
						}
					}
				);
			});
		});
	});

	STORY_TYPES.forEach((type) => {
		getStoryRef(type).on('value', (snapshot) => {
			const ids: string[] = snapshot && snapshot.val() || [];
			countsStore.put({ type, count: ids.length });
			console.log(`${type} stories were just updated`);
			ids.forEach((id, index) => {
				getItem(index, id).then((item) => {
					if (item) {
						update(item, type);
					}
				});
			});
		});
	});
}


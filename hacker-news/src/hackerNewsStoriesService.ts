import { throttle } from '@dojo/core/util';
import StoreBase from '@dojo/stores/store/StoreBase';
import IndexedDBStorage, { IndexedDBOptions } from '@dojo/stores/storage/IndexedDBStorage';
import createFilter from '@dojo/stores/query/createFilter';
import { from } from '@dojo/shim/native/array';
import Map from '@dojo/shim/Map';
import Promise from '@dojo/shim/Promise';
import Set from '@dojo/shim/Set';
import * as firebase from 'firebase';
import { Item } from './interfaces';

interface TypeCount {
	type: StoryType;
	count: number;
}

export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'jobs';

const DB_NAME = 'dojo2HackerNewsPWA';
const STORY_TYPES: StoryType[] = [ 'top', 'new', 'best', 'ask', 'show', 'jobs' ];
const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com/';
const MAX_COUNTS: { [ key in StoryType ]: number } = {
	top: 500,
	new: 500,
	best: 500,
	ask: 200,
	show: 200,
	jobs: 200
};
const itemIndexMaps: { [ key in StoryType ]: Map<string, { index: number, item: Item }> } = {
	top: new Map<string, { index: number, item: Item }>(),
	new: new Map<string, { index: number, item: Item }>(),
	best: new Map<string, { index: number, item: Item }>(),
	ask: new Map<string, { index: number, item: Item }>(),
	show: new Map<string, { index: number, item: Item }>(),
	jobs: new Map<string, { index: number, item: Item }>()
};
const idsMap: { [ key in StoryType ]: string[] } = { top: [], new: [], best: [], ask: [], show: [], jobs: [] };
let hasData = false;
let updatesStarted = false;

function createStoryStoreConfig(): IndexedDBOptions<Item, any> {
	return {
		idProperty: 'order',
		indices: {
			order: true
		}
	}
}

function createStoryStore(view: StoryType) {
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
	{} as { [ key in StoryType ]: StoreBase<Item> }
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

function getStoryRef(type: StoryType) {
	return database.ref(`/v0/${type === 'jobs' ? type.slice(0, -1) : type}stories`);
}

function getItem(id: string): Promise<Item | null> {
	return new Promise<Item | null>((resolve, reject) => {
		database.ref(`/v0/item/${id}`).once('value', (snapshot) => {
			const item: Item = snapshot.val();
			if (item) {
				resolve(item);
			}
			resolve(null);
		}, reject);
	});
}

export function getNumberOfStoriesForView(view: StoryType): Promise<number> {
	return countsStore.get(view).then((count: TypeCount) => count && count.count || MAX_COUNTS[view]);
}

export function getStoriesForView(view: StoryType, page: number, pageSize: number): Promise<Item[]> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;

	const fetchPromise = stores[view].fetch(
		createFilter<Item>().greaterThanOrEqualTo('order', start).lessThan('order', end)
	);

	const requestPromise = !hasData ? new Promise<Item[]>((resolve, reject) => {
		getStoryRef(view).once(
			'value',
			(snapshot) => {
				const ids: string[] = (snapshot.val() || []).slice(start, end);
				Promise.all(ids.map((id, index) => getItem(id)))
					.then<Item[]>((items) => items.filter((item) => item) as Item[], reject)
					.then(resolve, reject);
			},
			reject
		);
	}) : Promise.resolve([]);

	const result = new Promise((resolve, reject) => {
		let resolved = false;
		let noData = false;
		requestPromise.then((data) => {
			if (!resolved && (data.length || noData)) {
				resolved = true;
				resolve(data);
			}
		}, () => {
			if (noData) {
				resolve([]);
			}
		});

		fetchPromise.then((data) => {
			if (data.length) {
				hasData = true;
				if (!resolved) {
					resolved = true;
					resolve(data);
				}
			}
			else {
				noData = true;
			}
		}, reject);
	});

	result.then(() => {
		startUpdates();
	});

	return result;
}

const queuedUpdates = STORY_TYPES.reduce((queues, view) => {
	queues[view] = new Map<string, Item>();
	return queues;
}, {} as { [ key in StoryType ]: Map<string, Item>  });

const triggerUpdate =  throttle(() => {
	STORY_TYPES.forEach((view) => {
		const updates = queuedUpdates[view];
		if (updates.size) {
			stores[view].put(from(updates.values()));
			updates.clear();
		}
	});
}, 10);

function update(item: Item, view: StoryType) {
	queuedUpdates[view].set(item.id, item);
	triggerUpdate();
}

function startUpdates() {
	if (!updatesStarted) {
		updatesStarted = true;
		STORY_TYPES.forEach((type) => {
			getStoryRef(type).on('value', (snapshot) => {
				const ids: string[] = snapshot && snapshot.val() || [];
				countsStore.put({ type, count: ids.length });
				console.log(`${type} stories were just updated`);
				const previousIds = idsMap[type];
				const indexMap = itemIndexMaps[type];
				itemIndexMaps[type] = new Map<string, { index: number, item: Item }>();
				idsMap[type] = ids;
				ids.forEach((id, index) => {
					if (previousIds[index] !== id) {
						const oldData = indexMap.get(id);
						const itemPromise: Promise<Item | null> = oldData ?
							Promise.resolve(oldData.item) : getItem(id);
						itemPromise.then((item) => {
							if (item) {
								itemIndexMaps[type].set(id, { index, item });
								item.order = index;
								update(item, type);
							}
						});
					}
				});
			});
		});

		database.ref('/v0/updates').on('value', (snapshot) => {
			const updates: { items: string[] } | null = snapshot && snapshot.val();
			(updates && updates.items || []).forEach((id) => {
				if (STORY_TYPES.some((type) => itemIndexMaps[type].has(id))) {
					getItem(id).then((item) => {
						if (item) {
							STORY_TYPES.forEach((type) => {
								const entry = itemIndexMaps[type].get(id);
								if (entry) {
									update({ ...item, order: entry.index }, type);
								}
							});
						}
					})
				}
			});
		});
	}
}

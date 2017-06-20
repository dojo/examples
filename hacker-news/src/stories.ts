import { throttle } from '@dojo/core/util';
import StoreBase from '@dojo/stores/store/StoreBase';
import IndexedDBStorage from '@dojo/stores/storage/IndexedDBStorage';
import createFilter from '@dojo/stores/query/createFilter';
import createSort from '@dojo/stores/query/createSort';
import CompoundQuery from '@dojo/stores/query/CompoundQuery';
import Promise from '@dojo/shim/Promise';
import * as firebase from 'firebase';
import { Item } from './App';

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

export const store = new StoreBase<Item>({
	storage: new IndexedDBStorage<Item>({
		version: 10,
		idProperty: 'localId',
		dbName: DB_NAME,
		additionalStores: {
			'counts': {
				idProperty: 'type',
				indices: {
					type: true
				}
			}
		},
		objectStoreName: 'items',
		indices: {
			'type': true,
			'list': true,
			'updated': true
		}
	})
});

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

function getItem(type: story_type, index: number, id: string): Promise<Item> {
	return new Promise((resolve, reject) => {
		database.ref(`/v0/item/${id}`).once('value', (snapshot) => {
			const item: Item = snapshot.val();
			if (item) {
				item.localId = `${type}-${index}`;
				item.list = type;
				item.order = index;
				item.updated = Date.now();
				resolve(item);
			}
			reject(Error('Item not found'));
		});
	});
}

export function getCountForView(view: story_type) {
	return countsStore.get(view).then((count: TypeCount) => count && count.count || MAX_COUNTS[view]);
}

export function getStoriesForView(view: story_type, page: number, pageSize: number): Promise<Item[]> {
	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const query = new CompoundQuery({
		query: createFilter<Item>().equalTo('list', view)
			.greaterThanOrEqualTo('order', start)
			.lessThanOrEqualTo('order', end)
	});

	return store.fetch(query.withQuery(createSort<Item>('order'))).then((data) => {
		if (data.length) {
			return data;
		}
		return new Promise<Item[]>((resolve, reject) => {
			getStoryRef(view).once(
				'value',
				(snapshot) => {
					const ids: string[] = (snapshot.val() || []).slice(start, end);
					Promise.all(ids.map((id, index) => getItem(view, index, id))).then(resolve, reject);
				},
				reject
			);
		});
	});
}

const queuedUpdates: Item[] = [];

const triggerUpdate =  throttle(() => {
	store.put(queuedUpdates.splice(0))
}, 10);

function update(item: Item) {
	queuedUpdates.push(item);
	triggerUpdate();
}

export function startUpdates() {
	store.fetch(createFilter<Item>().lessThan('updated', Date.now() - ONE_DAY)).then((oldItems) => {
		oldItems.forEach((oldItem) => {
			const { list, order, id, localId } = oldItem;
			getItem(list, order, id).then(
				(item) => {
					if (item.deleted) {
						store.delete(localId);
					}
					else {
						update(item);
					}
				},
				() => {
					store.delete(localId);
				}
			);
		});
	});

	STORY_TYPES.forEach((type) => {
		getStoryRef(type).on('value', (snapshot) => {
			const ids: string[] = snapshot && snapshot.val() || [];
			countsStore.put({ type, count: ids.length });
			console.log(`${type} stories were just updated`);
			ids.forEach((id, index) => {
				getItem(type, index, id).then((item) => {
					update(item);
				});
			});
		});
	});
}


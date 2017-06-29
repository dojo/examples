import { throttle } from '@dojo/core/util';
import IndexedDBStorage from '@dojo/stores/storage/IndexedDBStorage';
import * as firebase from 'firebase';
import { story_type, TypeCount, Item } from "./interfaces";

const DB_NAME = 'dojo2HackerNewsPWA';
const STORY_TYPES: story_type[] = [ 'top', 'new', 'best', 'ask', 'show', 'jobs' ];

const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com/';
const database = firebase.initializeApp({ databaseURL: HACKER_NEWS_API_BASE }).database();

function getStoryRef(type: story_type) {
	return database.ref(`/v0/${type === 'jobs' ? type.slice(0, -1) : type}stories`);
}

function createStoryStore(view: story_type) {
	return new IndexedDBStorage<Item>({
		idProperty: 'order',
		dbName: DB_NAME,
		objectStoreName: view,
		indices: {
			order: true
		}
	});
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
const stores = STORY_TYPES.reduce(
	(stores, view) => {
		stores[view] = createStoryStore(view);

		return stores;
	},
	{} as { [ key in story_type ]: IndexedDBStorage<Item> }
);

export const countsStore = new IndexedDBStorage<TypeCount>({
	dbName: DB_NAME,
	objectStoreName: 'counts',
	idProperty: 'type',
	indices: {
		type: true
	}
});

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

onmessage = () => {
	function stagger(duration: number) {
		return new Promise((resolve) => {
			setTimeout(resolve, duration);
		})
	}
	setTimeout(() => {
		STORY_TYPES.reduce((promise, type) => {
			return promise.then(() => {
				getStoryRef(type).once('value', (snapshot) => {
					const ids: string[] = snapshot && snapshot.val() || [];
					countsStore.put([ { type, count: ids.length } ]);
					console.log(`${type} stories were just updated`);
					ids.forEach((id, index) => {
						getItem(index, id).then((item) => {
							if (item) {
								update(item, type);
							}
						});
					});
				});
				return stagger(100);
			});
		}, stagger(100));
	}, 5000);

};

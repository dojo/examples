import createAction from 'dojo-actions/createAction';
import Promise from 'dojo-shim/Promise';
import * as uuid from 'node-uuid';

import todoStore, { Item } from '../stores/todoStore';

export const addTodo = createAction({
	do({ label }: { label: string }) {
		const id = uuid.v4();
		return todoStore.add({ id, label });
	}
});

export const deleteTodo = createAction({
	do({ id }: { id: string }) {
		return todoStore.delete(id);
	}
});

export const deleteCompleted = createAction({
	do() {
		return todoStore.get()
			// <any> hammer since the store isn't typed to return an iterator (which it does).
			.then((items: any) => {
				const promises = Array.from<Item>(items)
					.filter(({ completed }) => completed)
					.map(({ id }) => todoStore.delete(id));
				return Promise.all(promises);
			});
	}
});

export const toggleAll = createAction({
	do({ checked: completed }: { checked: boolean }) {
		return todoStore.get()
			// <any> hammer since the store isn't typed to return an iterator (which it does).
			.then((items: any) => {
				const promises = Array.from<Item>(items)
					.map(({ id }) => todoStore.patch({ completed }, { id }));
				return Promise.all(promises);
			});
	}
});

export const updateTodo = createAction({
	do(item: Item) {
		return todoStore.patch(item);
	}
});

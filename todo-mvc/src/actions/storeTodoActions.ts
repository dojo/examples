import createAction, { ActionOptions } from 'dojo-actions/createAction';
import { RegistryProvider } from 'dojo-app/createApp';
import Promise from 'dojo-shim/Promise';

import { Item, Store } from '../stores/todoStore';

// Cast object so the variable is never undefined.
let todoStore = <Store> {};

let configurationResolution: Promise<void>;
function resolveConfiguration(registryProvider: RegistryProvider) {
	if (configurationResolution) {
		return configurationResolution;
	}

	configurationResolution = registryProvider.get('stores')
		.get('todo-store')
		.then((store: Store) => {
			todoStore = store;
		});
	return configurationResolution;
}

function createStoreAction(options: ActionOptions<any, any>) {
	options.configure = resolveConfiguration;
	return createAction(options);
}

export const addTodo = createStoreAction({
	do({ label }: { label: string }) {
		return todoStore.add({ id: `${Date.now()}`, label });
	}
});

export const deleteTodo = createStoreAction({
	do({ id }: { id: string }) {
		return todoStore.delete(id);
	}
});

export const deleteCompleted = createStoreAction({
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

export const toggleAll = createStoreAction({
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

export const updateTodo = createStoreAction({
	do(item: Item) {
		return todoStore.patch(item);
	}
});

import createAction, { ActionOptions } from 'dojo-actions/createAction';
import { RegistryProvider } from 'dojo-app/createApp';
import Promise from 'dojo-shim/Promise';

import { MemoryStore } from 'dojo-stores/createMemoryStore';

// Cast object so the variable is never undefined.
let todoStore = <MemoryStore<Object>> {};

let configurationResolution: Promise<void>;
function resolveConfiguration(registryProvider: RegistryProvider) {
	if (configurationResolution) {
		return configurationResolution;
	}

	configurationResolution = registryProvider.get('stores')
		.get('todo-store')
		.then((store: MemoryStore<Object>) => {
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
			.then((items: any) => {
				const promises = Array.from(items)
					.filter((item: any) => item.completed)
					.map((item: any) => todoStore.delete(item.id));
				return Promise.all(promises);
			});
	}
});

export const toggleAll = createStoreAction({
	do({ checked: completed }: { checked: boolean }) {
		return todoStore.get()
			.then((items: any) => {
				const promises = Array.from(items)
					.map(({ id }: { id: string }) => todoStore.patch({ completed }, { id }));
				return Promise.all(promises);
			});
	}
});

export const updateTodo = createStoreAction({
	do(item: any) {
		return todoStore.patch(item);
	}
});

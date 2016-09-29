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
	do(todo: {label: string}) {
		return todoStore.add({ id: `${Date.now()}`, label: todo.label });
	}
});

export const deleteTodo = createStoreAction({
	do(options: {id: string}) {
		return todoStore.delete(options.id);
	}
});

export const deleteCompleted = createStoreAction({
	do() {
		todoStore.get().then((items: any) => {
			Array.from(items)
				.filter((item: any) => item.completed)
				.forEach((item: any) => todoStore.delete(item.id));
		});
	}
});

export const toggleAll = createStoreAction({
	do(options: {checked: boolean}) {
		return todoStore.get().then((items: any) => {
			return Promise.all(Array.from(items).map((item: any) =>
				todoStore.patch(Object.assign({}, item, {completed: options.checked}))));
		});
	}
});

export const updateTodo = createStoreAction({
	do(todo: any) {
		return todoStore.patch(todo);
	}
});

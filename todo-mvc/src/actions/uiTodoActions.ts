import createAction, { AnyAction, ActionOptions } from 'dojo-actions/createAction';
import { DEFAULT_WIDGET_STORE, RegistryProvider } from 'dojo-app/createApp';
import Promise from 'dojo-shim/Promise';
import { MemoryStore } from 'dojo-stores/createMemoryStore';

// Cast objects so these variables are never undefined.
let addTodo = <AnyAction> {};
let deleteCompleted = <AnyAction> {};
let deleteTodo = <AnyAction> {};
let toggleAll = <AnyAction> {};
let updateTodo = <AnyAction> {};
let widgetStore = <MemoryStore<Object>> {};

let configurationResolution: Promise<void>;
function resolveConfiguration(registryProvider: RegistryProvider) {
	if (configurationResolution) {
		return configurationResolution;
	}

	const actionRegistry = registryProvider.get('actions');
	const gotActions = Promise.all([
		actionRegistry.get('addTodo'),
		actionRegistry.get('deleteCompleted'),
		actionRegistry.get('deleteTodo'),
		actionRegistry.get('toggleAll'),
		actionRegistry.get('updateTodo')
	]).then((results) => {
		addTodo = results[0];
		deleteCompleted = results[1];
		deleteTodo = results[2];
		toggleAll = results[3];
		updateTodo = results[4];
	});

	const storeRegistry = registryProvider.get('stores');
	const gotStore = storeRegistry.get(DEFAULT_WIDGET_STORE)
		.then((store: MemoryStore<Object>) => {
			widgetStore = store;
		});

	configurationResolution = Promise.all([gotActions, gotStore]).then(() => {});
	return configurationResolution;
}

function createUserAction(options: ActionOptions<any, any>) {
	options.configure = resolveConfiguration;
	return createAction(options);
}

export const todoInput = createUserAction({
	do(options: any) {
		if (options.event.keyCode === 13 && options.event.target.value) {
			addTodo.do({label: options.event.target.value, completed: false});
			widgetStore.patch({id: 'new-todo', value: ''});
		}
	}
});

export const todoEdit = createUserAction({
	do(options: any) {
		widgetStore.patch(Object.assign(options, {editing: true}));
	}
});

export const todoEditInput = createUserAction({
	do(options: any) {
		if (options.event.keyCode === 13) {
			todoSave.do(options);
		}
		else if (options.event.keyCode === 27) {
			widgetStore.patch(Object.assign(options.state, {editing: false}));
		}
	}
});

export const todoSave = createUserAction({
	do(options: any) {
		const label = options.event.target.value;

		if (!label) {
			deleteTodo.do({id: options.state.id});
		}
		else {
			updateTodo.do(Object.assign(options.state, {label, editing: false}));
		}
	}
});

export const todoRemove = createUserAction({
	do(options: {id: string}) {
		deleteTodo.do(options);
	}
});

export const todoToggleComplete = createUserAction({
	do(options: any) {
		const item = Object.assign({}, options, { completed: !options.completed });
		updateTodo.do(item);
	}
});

export const filter = createUserAction({
	do(options: {filter: string}) {
		widgetStore.patch({id: 'todo-footer', activeFilter: options.filter});
		widgetStore.patch({id: 'todo-list', activeFilter: options.filter});
	}
});

export const todoToggleAll = createUserAction({
	do(options: any) {
		const checked = options.event.target.checked;
		toggleAll.do({checked});
	}
});

export const clearCompleted = createUserAction({
	do() {
		deleteCompleted.do();
	}
});

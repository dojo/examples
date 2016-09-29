import createAction, { Action } from 'dojo-actions/createAction';
import { DEFAULT_WIDGET_STORE, RegistryProvider } from 'dojo-app/createApp';
import Promise from 'dojo-shim/Promise';
import { MemoryStore } from 'dojo-stores/createMemoryStore';

type UserAction = Action<void, {}, {}> & {
	addTodo: Action<void, {}, {}>;
	deleteCompleted: Action<void, {}, {}>;
	deleteTodo: Action<void, {}, {}>;
	toggleAll: Action<void, {}, {}>;
	updateTodo: Action<void, {}, {}>;
	widgetStore: MemoryStore<Object>;
}

function configure(this: UserAction, registryProvider: RegistryProvider) {
	const actionRegistry = registryProvider.get('actions');
	const gotActions = Promise.all([
		actionRegistry.get('addTodo'),
		actionRegistry.get('deleteCompleted'),
		actionRegistry.get('deleteTodo'),
		actionRegistry.get('toggleAll'),
		actionRegistry.get('updateTodo')
	]).then((results) => {
		this.addTodo = results[0];
		this.deleteCompleted = results[1];
		this.deleteTodo = results[2];
		this.toggleAll = results[3];
		this.updateTodo = results[4];
	});

	const storeRegistry = registryProvider.get('stores');
	const gotStore = storeRegistry.get(DEFAULT_WIDGET_STORE)
		.then((store: MemoryStore<Object>) => {
			this.widgetStore = store;
		});

	return Promise.all([gotActions, gotStore]).then(() => {});
}

export const todoInput = createAction({
	configure,
	do(this: UserAction, options: any) {
		if (options.event.keyCode === 13 && options.event.target.value) {
			this.addTodo.do({label: options.event.target.value, completed: false});
			this.widgetStore.patch({id: 'new-todo', value: ''});
		}
	}
});

export const todoEdit = createAction({
	configure,
	do(this: UserAction, options: any) {
		this.widgetStore.patch(Object.assign(options, {editing: true}));
	}
});

export const todoEditInput = createAction({
	configure,
	do(this: UserAction, options: any) {
		if (options.event.keyCode === 13) {
			todoSave.do(options);
		}
		else if (options.event.keyCode === 27) {
			this.widgetStore.patch(Object.assign(options.state, {editing: false}));
		}
	}
});

export const todoSave = createAction({
	configure,
	do(this: UserAction, options: any) {
		const label = options.event.target.value;

		if (!label) {
			this.deleteTodo.do({id: options.state.id});
		}
		else {
			this.updateTodo.do(Object.assign(options.state, {label, editing: false}));
		}
	}
});

export const todoRemove = createAction({
	configure,
	do(this: UserAction, options: {id: string}) {
		this.deleteTodo.do(options);
	}
});

export const todoToggleComplete = createAction({
	configure,
	do(this: UserAction, options: any) {
		const item = Object.assign({}, options, { completed: !options.completed });
		this.updateTodo.do(item);
	}
});

export const filter = createAction({
	configure,
	do(options: {filter: string}) {
		this.widgetStore.patch({id: 'todo-footer', activeFilter: options.filter});
		this.widgetStore.patch({id: 'todo-list', activeFilter: options.filter});
	}
});

export const todoToggleAll = createAction({
	configure,
	do(this: UserAction, options: any) {
		const checked = options.event.target.checked;
		this.toggleAll.do({checked});
	}
});

export const clearCompleted = createAction({
	configure,
	do(this: UserAction) {
		this.deleteCompleted.do();
	}
});

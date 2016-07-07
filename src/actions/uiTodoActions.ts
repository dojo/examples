import { CombinedRegistry } from 'dojo-app/createApp';
import createAction, { AnyAction } from 'dojo-actions/createAction';
import * as storeActions from './storeTodoActions';
import { MemoryStore } from '../utils/createLocalMemoryStore';

interface UiTodoAction {
	widgetStore: MemoryStore<Object>;
}

function configure (registry: CombinedRegistry) {
	const action = <UiTodoAction> this;
	return registry.getStore('widget-store').then((widgetStore: MemoryStore<Object>) => {
		action.widgetStore = widgetStore;
	});
};

export const todoInput: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <UiTodoAction> this;
		if (options.event.keyCode === 13 && options.event.target.value) {
			storeActions.addTodo.do({label: options.event.target.value, completed: false});
			widgetStore.patch({id: 'new-todo', value: ''});
		}
	}
});

export const todoEdit: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <UiTodoAction> this;

		widgetStore.patch(Object.assign(options, {editing: true}));
	}
});

export const todoEditInput: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <UiTodoAction> this;

		if (options.event.keyCode === 13) {
			todoSave.do(options);
		}
		else if (options.event.keyCode === 27) {
			widgetStore.patch(Object.assign(options.state, {editing: false}));
		}
	}
});

export const todoSave: AnyAction = createAction({
	do(options: any) {
		const label = options.event.target.value;

		if (!label) {
			storeActions.deleteTodo.do({id: options.state.id});
		}
		else {
			storeActions.updateTodo.do(Object.assign(options.state, {label, editing: false}));
		}
	}
});

export const todoRemove: AnyAction = createAction({
	do(options: {id: string}) {
		storeActions.deleteTodo.do(options);
	}
});

export const todoToggleComplete: AnyAction = createAction({
	do(options: any) {
		const item = Object.assign({}, options, { completed: !options.completed });
		storeActions.updateTodo.do(item);
	}
});

export const filter: AnyAction = createAction({
	configure,
	do(options: {filter: string}) {
		const { widgetStore } = <UiTodoAction> this;
		widgetStore.patch({id: 'todo-footer', activeFilter: options.filter});
		widgetStore.patch({id: 'todo-list', activeFilter: options.filter});
	}
});

export const todoToggleAll: AnyAction = createAction({
	do(options: any) {
		const checked = options.event.target.checked;
		storeActions.toggleAll.do({checked});
	}
});

export const clearCompleted: AnyAction = createAction({
	do() {
		storeActions.deleteCompleted.do();
	}
});

import createAction, { AnyAction } from 'dojo-actions/createAction';
import * as storeActions from './storeTodoActions';

function configure (registry: any) {
	const action = <any> this;
	return registry.getStore('widget-store').then((widgetStore: any) => {
		action.widgetStore = widgetStore;
	});
};

export const todoInput: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <any> this;
		if (options.event.keyCode === 13 && options.event.target.value) {
			storeActions.addTodo.do({label: options.event.target.value, completed: false});
			widgetStore.patch({id: 'new-todo', value: ''});
		}
	}
});

export const todoEdit: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <any> this;

		widgetStore.patch(Object.assign(options, {editing: true}));
	}
});

export const todoEditInput: AnyAction = createAction({
	configure,
	do(options: any) {
		const { widgetStore } = <any> this;

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
			storeActions.deleteTodo.do(options.state.id);
		}
		else {
			storeActions.updateTodo.do(Object.assign(options.state, {label, editing: false}));
		}
	}
});

export const todoRemove: AnyAction = createAction({
	do(options: any) {
		storeActions.deleteTodo.do(options.id);
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
	do(options: any) {
		const { widgetStore } = <any> this;
		widgetStore.patch({id: 'todo-footer', activeFilter: options.filter});
		widgetStore.patch({id: 'todo-list', activeFilter: options.filter});
	}
});

export const todoToggleAll: AnyAction = createAction({
	configure,
	do(options: any) {
		const checked = options.event.target.checked;
		storeActions.toggleAll.do({checked});
	}
});

export const clearCompleted: AnyAction = createAction({
	configure,
	do(options: any) {
		storeActions.deleteCompleted.do();
	}
});

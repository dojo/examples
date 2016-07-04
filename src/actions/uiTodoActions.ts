import createAction, { AnyAction } from 'dojo-actions/createAction';
import * as storeActions from './storeTodoActions';

function configure (registry: any) {
	const action = <any> this;
	registry.getStore('widget-store').then((widgetStore: any) => {
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

export const clearCompleted: AnyAction = createAction({
	configure,
	do(options: any) {
		storeActions.deleteCompleted.do();
	}
});

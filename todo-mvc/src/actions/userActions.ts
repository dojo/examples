import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import widgetStore from '../stores/widgetStore';
import {
	addTodo,
	deleteCompleted,
	deleteTodo,
	toggleAll,
	updateTodo
} from './todoStoreActions';

export const todoInput = createAction({
	do(options: any) {
		if (options.event.keyCode === 13 && options.event.target.value) {
			addTodo.do({label: options.event.target.value, completed: false});
			widgetStore.patch({id: 'new-todo', value: ''});
		}
	}
});

export const todoEdit = createAction({
	do(options: any) {
		widgetStore.patch(assign(options, {editing: true}));
	}
});

export const todoEditInput = createAction({
	do(options: any) {
		if (options.event.keyCode === 13) {
			todoSave.do(options);
		}
		else if (options.event.keyCode === 27) {
			widgetStore.patch(assign(options.state, {editing: false}));
		}
	}
});

export const todoSave = createAction({
	do(options: any) {
		const label = options.event.target.value;

		if (!label) {
			deleteTodo.do({id: options.state.id});
		}
		else {
			updateTodo.do(assign(options.state, {label, editing: false}));
		}
	}
});

export const todoRemove = createAction({
	do(options: {id: string}) {
		deleteTodo.do(options);
	}
});

export const todoToggleComplete = createAction({
	do(options: any) {
		const item = assign({}, options, { completed: !options.completed });
		updateTodo.do(item);
	}
});

export const filter = createAction({
	do(options: {filter: string}) {
		widgetStore.patch({id: 'todo-footer', activeFilter: options.filter});
		widgetStore.patch({id: 'todo-list', activeFilter: options.filter});
	}
});

export const todoToggleAll = createAction({
	do(options: any) {
		const checked = options.event.target.checked;
		toggleAll.do({checked});
	}
});

export const clearCompleted = createAction({
	do() {
		deleteCompleted.do();
	}
});

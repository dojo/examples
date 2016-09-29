import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { Item } from '../stores/todoStore';
import widgetStore from '../stores/widgetStore';
import {
	addTodo,
	deleteCompleted,
	deleteTodo,
	toggleAll,
	updateTodo
} from './todoStoreActions';

interface FormEvent extends Event {
	target: HTMLInputElement;
}

interface FormInputEvent extends KeyboardEvent {
	target: HTMLInputElement;
}

export const todoInput = createAction({
	do({
		event: {
			keyCode,
			target: { value: label }
		}
	}: { event: FormInputEvent }) {
		if (keyCode === 13 && label) {
			addTodo.do({ label, completed: false });
			return widgetStore.patch({ id: 'new-todo', value: '' });
		}
	}
});

export const todoEdit = createAction({
	do(options: any) {
		return widgetStore.patch(assign(options, { editing: true }));
	}
});

export const todoEditInput = createAction({
	do(options: { event: FormInputEvent, state: any }) {
		const { event: { keyCode } } = options;
		if (keyCode === 13) {
			return todoSave.do(options);
		}
		else if (keyCode === 27) {
			return widgetStore.patch(assign(options.state, { editing: false }));
		}
	}
});

export const todoSave = createAction({
	do({
		event: {
			target: { value: label }
		},
		state
	}: { event: FormInputEvent, state: any }) {
		if (!label) {
			return deleteTodo.do(state);
		}
		else {
			return updateTodo.do(assign(state, { label, editing: false }));
		}
	}
});

export const todoRemove = createAction({
	do(item: Item) {
		return deleteTodo.do(item);
	}
});

export const todoToggleComplete = createAction({
	do(item: Item) {
		item = assign({}, <any> item, { completed: !item.completed });
		return updateTodo.do(item);
	}
});

export const filter = createAction({
	do({ filter: activeFilter }: {filter: string}) {
		return Promise.all([
			widgetStore.patch({ id: 'todo-footer', activeFilter }),
			widgetStore.patch({ id: 'todo-list', activeFilter })
		]);
	}
});

export const todoToggleAll = createAction({
	do({
		event: {
			target: { checked }
		}
	}: { event: FormEvent }) {
		toggleAll.do({ checked });
	}
});

export const clearCompleted = createAction({
	do() {
		return deleteCompleted.do();
	}
});

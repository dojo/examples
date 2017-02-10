import { deepAssign } from '@dojo/core/lang';
import app, { Item } from '../App';
import router, { todoViewRoute } from '../routes';
import { addTodo, deleteCompleted, deleteTodo, toggleAll, updateTodo } from './todoStoreActions';

interface FormEvent extends Event {
	target: HTMLInputElement;
}

interface FormInputEvent extends KeyboardEvent {
	target: HTMLInputElement;
}

/*
 const completedCount = afterAll.filter(({ completed }) => completed).length;
 const activeCount = afterAll.length - completedCount;
 const allCompleted = afterAll.length === completedCount;
 */

export const todoInput = function (this: any, { which, target: { value: label } }: FormInputEvent) {
	if (which === 13 && label) {
		addTodo({ label, completed: false });

		app().setProperties(deepAssign({}, app().properties, {
			todo: ''
		}));
	}
};

function toggleEditing(todos: Item[], todoId: string, editing: boolean): Item[] {
	return todos
		.filter((todo) => todo.id === todoId)
		.map((todo: Item) => {
			todo.editing = editing;
			return todo;
		});
}

export const todoEdit = function (this: any, event: KeyboardEvent) {
	const { properties: { todoId } } = this;
	if (event.type === 'keypress' && event.which !== 13 && event.which !== 32) {
		return;
	}

	const link = router.link(todoViewRoute, {
		filter: app().properties.activeFilter,
		view: app().properties.activeView,
		todoId
	});

	document.location.href = link;
};

export const todoEditInput = function (this: any, event: FormInputEvent) {
	const { properties } = this;
	if (event.which === 13) {
		todoSave.call(this, event);
	}
	else if (event.which === 27) {
		app().setProperties(deepAssign({}, app().properties, {
			todos: toggleEditing(app().properties.todos || [], properties.id, false)
		}));
	}
};

export const todoSave = function (this: any, event: FormInputEvent) {
	const { properties } = this;
	if (!event.target.value) {
		deleteTodo(properties);
	}
	else {
		updateTodo(deepAssign({}, properties, { label: event.target.value, editing: false }));
	}
};

export const todoRemove = function (this: any) {
	const { state } = this;
	deleteTodo({ id: state.id });
};

export const todoToggleComplete = function (this: any) {
	const { properties } = this;
	updateTodo({ id: properties.todoId, completed: !properties.completed, editing: false });
};

export const todoToggleAll = function (event: FormEvent) {
	toggleAll({ checked: event.target.checked });
};

export const clearCompleted = function () {
	deleteCompleted();
};

export const updateSearch = function (this: any, searchQuery: string) {
	app().setProperties(deepAssign({}, app().properties, {
		search: searchQuery
	}));
};

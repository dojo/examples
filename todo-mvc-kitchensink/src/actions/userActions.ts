import { assign } from 'dojo-core/lang';
import widgetStore from '../stores/widgetStore';
import { addTodo, deleteCompleted, deleteTodo, toggleAll, updateTodo } from './todoStoreActions';
import router, { todoViewRoute } from '../routes';
import { Item } from '../stores/todoStore';

interface FormEvent extends Event {
	target: HTMLInputElement;
}

interface FormInputEvent extends KeyboardEvent {
	target: HTMLInputElement;
}

export const todoInput = function({ which, target: { value: label } }: FormInputEvent) {
	if (which === 13 && label) {
		addTodo({ label, completed: false });
		widgetStore.patch({ id: 'todo-app', todo: '' });
	} else {
		widgetStore.patch({ id: 'todo-app', todo: label });
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

export const todoEdit = function(this: any, event: KeyboardEvent) {
	const { state: { id } } = this;
	if (event.type === 'keypress' && event.which !== 13 && event.which !== 32) {
		return;
	}
	widgetStore.get('todo-app').then((todoListState: any) => {
		const link = router.link(todoViewRoute, {
			filter: todoListState.activeFilter,
			view: todoListState.activeView,
			todoId: id
		});
		document.location.href = link;
	});
};

export const todoEditInput = function(this: any, event: FormInputEvent) {
	const { state } = this;
	if (event.which === 13) {
		todoSave.call(this, event);
	}
	else if (event.which === 27) {
		widgetStore.get('todo-app').then(( todoListState: any) => {
			const { todos } = todoListState;
			todoListState.todos = toggleEditing(todos, state.id, false);
			widgetStore.patch({ id: 'todo-app', todoListState });
		});
	}
};

export const todoSave = function(this: any, event: FormInputEvent) {
	const { state } = this;
	if (!event.target.value) {
		deleteTodo(state);
	}
	else {
		updateTodo(assign(state, { label: event.target.value, editing: false }));
	}
};

export const todoRemove = function(this: any) {
	const { state } = this;
	deleteTodo({ id: state.id });
};

export const todoToggleComplete = function(this: any) {
	const { state } = this;
	updateTodo({ id: state.id, completed: !state.checked, editing: false });
};

export const todoToggleAll = function(event: FormEvent) {
	toggleAll({ checked: event.target.checked });
};

export const clearCompleted = function() {
	deleteCompleted();
};

export const updateSearch = function(this: any, searchQuery: string) {
	widgetStore.get('todo-app').then((todoListState: any) => {
		todoListState.search = searchQuery;

		widgetStore.patch({ id: 'todo-app', todoListState });
	});
};

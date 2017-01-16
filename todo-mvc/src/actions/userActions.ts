import { assign } from '@dojo/core/lang';
import widgetStore from '../stores/widgetStore';
import { addTodo, deleteCompleted, deleteTodo, toggleAll, updateTodo } from './todoStoreActions';
import { TodoItemProperties } from '../widgets/createTodoItem';

interface FormEvent extends Event {
	target: HTMLInputElement;
}

interface FormInputEvent extends KeyboardEvent {
	target: HTMLInputElement;
}

export const todoInput = function(this: any, { which, target: { value: label } }: FormInputEvent) {
	if (which === 13 && label) {
		addTodo({ label, completed: false });
		widgetStore.patch({ id: 'todo-app', todo: '' });
		this.invalidate();
	}
};

function toggleEditing(todos: TodoItemProperties[], todoId: string, editing: boolean): TodoItemProperties[] {
	return todos
		.filter((todo) => todo.id === todoId)
		.map((todo) => {
			todo.editing = true;
			return todo;
		});
}

export const todoEdit = function(this: any, event: KeyboardEvent | MouseEvent) {
	const { state: { id } } = this;
	if (event.type === 'keypress' && event.which !== 13 && event.which !== 32) {
		return;
	}
	widgetStore.get('todo-app').then((todoListState: any) => {
		const { todos } = todoListState;
		todoListState.todos = toggleEditing(todos, id, true);
		return widgetStore.patch({ id: 'todo-app', todoListState });
	});
};

export const todoEditInput = function(this: any, event: FormInputEvent) {
	const { state } = this;
	if (event.which === 13) {
		todoSave.call(this, event);
	}
	else if (event.which === 27) {
		widgetStore.get('todo-app').then((todoListState: any) => {
			todoListState.todos = toggleEditing(todoListState.todos, state.id, false);
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
	updateTodo({ id: state.id, completed: !state.completed });
};

export const filter = function(this: any, { filter }: { filter: 'active' | 'all' | 'completed' }) {
	const { state: { activeFilter = filter } = { } } = this;
	widgetStore.patch({ id: 'todo-app', activeFilter });
};

export const todoToggleAll = function(event: FormEvent) {
	toggleAll({ checked: event.target.checked });
};

export const clearCompleted = function() {
	deleteCompleted();
};

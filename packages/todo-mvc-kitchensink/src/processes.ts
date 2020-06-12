import { createCommandFactory, createProcess } from '@dojo/framework/stores/process';
import { State, Todo } from './store';

let counter = 0;
const commandFactory = createCommandFactory<State>();

function findTodo(id?: string) {
	return (todo: Todo) => todo.id === id;
}

const addTodoCommand = commandFactory<{ label: string }>(({ state, payload: { label } }) => {
	const id = `${Date.now()}-${counter++}`;
	if (state.todos) {
		state.todos.push({ id, label });
	} else {
		state.todos = [{ id, label }];
	}
});

const deleteTodoCommand = commandFactory<{ id: string }>(({ state, payload: { id } }) => {
	if (state.todos) {
		const index = state.todos.findIndex(findTodo(id));
		if (index !== -1) {
			if (state.todos[index].completed && state.completedCount) {
				state.completedCount = state.completedCount - 1;
			}
			state.todos.splice(index, 1);
		}
	}
});

const clearCompletedCommand = commandFactory(({ state }) => {
	if (state.todos) {
		state.todos = state.todos.filter((todo) => !todo.completed);
	}
	state.completedCount = 0;
});

const toggleTodoCommand = commandFactory<{ id: string }>(({ state, payload: { id } }) => {
	if (state.todos) {
		const index = state.todos.findIndex(findTodo(id));
		if (index !== -1) {
			const completed = state.todos[index].completed;
			let completedCount = state.completedCount || 0;
			if (completed) {
				completedCount--;
			} else {
				completedCount++;
			}
			state.completedCount = completedCount;
			state.todos[index].completed = !completed;
		}
	}
});

const toggleAllTodosCommand = commandFactory(({ state }) => {
	const completedCount = state.completedCount || 0;
	if (state.todos) {
		const complete = completedCount !== state.todos.length;
		state.todos.forEach((todo) => (todo.completed = complete));
		if (complete) {
			state.completedCount = state.todos.length;
		} else {
			state.completedCount = 0;
		}
	}
});

const todoInputCommand = commandFactory<{ current: string }>(({ state, payload }) => {
	state.current = payload.current;
});

const clearTodoInputCommand = commandFactory(({ state }) => {
	state.current = undefined;
});

const todoEditModeCommand = commandFactory<{ id: string; label: string }>(({ state, payload: { id, label } }) => {
	state.editingId = id;
	state.editingLabel = label;
});

const todoReadModeCommand = commandFactory(({ state }) => {
	state.editingId = undefined;
	state.editingLabel = undefined;
});

const saveTodoCommand = commandFactory(({ state }) => {
	if (state.todos) {
		const todo = state.todos.find(findTodo(state.editingId));
		if (state.editingLabel && todo) {
			todo.label = state.editingLabel;
		}
	}
});

const updateTodoCommand = commandFactory<{ label: string }>(({ state, payload: { label } }) => {
	state.editingLabel = label;
});

const searchCommand = commandFactory<{ search: string }>(({ payload: { search }, state }) => {
	state.search = search;
});

export const addTodo = createProcess('add-todo', [clearTodoInputCommand, addTodoCommand]);
export const todoInput = createProcess('input-todo', [todoInputCommand]);
export const deleteTodo = createProcess('delete-todo', [deleteTodoCommand]);
export const toggleTodo = createProcess('toggle-todo', [toggleTodoCommand]);
export const toggleAllTodos = createProcess('toggle-all-todos', [toggleAllTodosCommand]);
export const todoEditMode = createProcess('edit-mode-todo', [todoEditModeCommand]);
export const todoReadMode = createProcess('read-mode-todo', [todoReadModeCommand]);
export const saveTodo = createProcess('save-todo', [saveTodoCommand, todoReadModeCommand]);
export const updateTodoInput = createProcess('update-todo-input', [updateTodoCommand]);
export const clearCompleted = createProcess('clear-completed', [clearCompletedCommand]);
export const todoSearch = createProcess('search', [searchCommand]);

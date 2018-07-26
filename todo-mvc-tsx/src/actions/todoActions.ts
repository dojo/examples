import uuid from '@dojo/framework/core/uuid';

export function addTodo() {
	return { type: 'ADD_TODO', payload: { id: uuid() }};
}

export function todoInput(currentTodo: string) {
	return { type: 'TODO_INPUT', payload: { currentTodo }};
}

export function removeTodo(id: string) {
	return { type: 'DELETE_TODO', payload: { id }};
}

export function toggleTodo(id: string) {
	return { type: 'TOGGLE_TODO', payload: { id }};
}

export function clearCompleted() {
	return { type: 'CLEAR_COMPLETED' };
}

export function toggleTodos() {
	return { type: 'TOGGLE_TODOS' };
}

export function editTodo(id: string) {
	return { type: 'EDIT_TODO', payload: { id }};
}

export function saveTodo(id: string, label?: string) {
	return { type: 'SAVE_TODO', payload: { id, label }};
}

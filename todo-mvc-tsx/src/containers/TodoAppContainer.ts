import uuid from '@dojo/core/uuid';
import { Container } from '@dojo/widget-core/Container';
import { TodoApp } from './../widgets/TodoApp';
import { Store } from './../store/store';

function getProperties(store: Store<any>, properties: any) {
	const state = store.getState();

	function addTodo() {
		store.dispatch({ type: 'ADD_TODO', payload: { id: uuid() }});
	}

	function todoInput(currentTodo: string) {
		store.dispatch({ type: 'TODO_INPUT', payload: { currentTodo }});
	}

	function removeTodo(id: string) {
		store.dispatch({ type: 'DELETE_TODO', payload: { id }});
	}

	function toggleTodo(id: string) {
		store.dispatch({ type: 'TOGGLE_TODO', payload: { id }});
	}

	function clearCompleted() {
		store.dispatch({ type: 'CLEAR_COMPLETED' });
	}

	function toggleTodos() {
		store.dispatch({ type: 'TOGGLE_TODOS' });
	}

	function editTodo(id: string) {
		store.dispatch({ type: 'EDIT_TODO', payload: { id }});
	}

	return {
		addTodo,
		todoInput,
		removeTodo,
		toggleTodo,
		toggleTodos,
		clearCompleted,
		editTodo,
		currentTodo: state.currentTodo,
		completedCount: state.completedCount,
		activeCount: state.activeCount,
		todos: state.todos || []
	};
}

export const TodoAppContainer = Container(TodoApp, 'application-state', { getProperties });

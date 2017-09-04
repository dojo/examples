import { Container } from '@dojo/widget-core/Container';
import { TodoApp } from './../widgets/TodoApp';
import uuid from '@dojo/core/uuid';
import { Store } from 'le-store/store';
import {
	addTodoProcessWithPost,
	editTodoProcess,
	toggleTodoProcess,
	deleteTodoProcess,
	toggleAllTodoProcess,
	clearCompletedProcess,
	saveTodoProcess,
	todoInputProcess,
	clearFailedProcess
} from './../processes/todoProcesses';

function getProperties(store: Store, properties: any) {
	const { get, createExecutor } = store;

	return {
		clearFailed: createExecutor(clearFailedProcess),
		addTodo: createExecutor(addTodoProcessWithPost, (label: string) => {
			return { id: uuid(), label, completed: false, loading: true };
		}),
		todoInput: createExecutor(todoInputProcess),
		removeTodo: createExecutor(deleteTodoProcess),
		toggleTodo: createExecutor(toggleTodoProcess),
		toggleTodos: createExecutor(toggleAllTodoProcess),
		clearCompleted: createExecutor(clearCompletedProcess),
		editTodo: createExecutor(editTodoProcess),
		saveTodo: createExecutor(saveTodoProcess),
		currentTodo: get('/currentTodo'),
		completedCount: get('/completedCount'),
		activeCount: get('/activeCount'),
		todos: get('/todos'),
		failed: get('/failed'),
		undo: (): void => {
			store.undo(addTodoProcessWithPost, toggleTodoProcess);
		},
		hasUndoOperations: store.hasUndoOperations
	};
}

export const TodoAppContainer = Container(TodoApp, 'application-state', { getProperties });

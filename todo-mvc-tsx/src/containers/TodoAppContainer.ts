import { Container } from '@dojo/widget-core/Container';
import { TodoApp } from './../widgets/TodoApp';
import { Store } from 'redux';
import {
	addTodo,
	todoInput,
	removeTodo,
	toggleTodo,
	toggleTodos,
	clearCompleted,
	editTodo,
	saveTodo
} from './../actions/todoActions';

function getProperties(store: Store<any>, properties: any) {
	const state = store.getState();

	return {
		addTodo: () => store.dispatch(addTodo()),
		todoInput: (todo: string) => store.dispatch(todoInput(todo)),
		removeTodo: (id: string) => store.dispatch(removeTodo(id)),
		toggleTodo: (id: string) => store.dispatch(toggleTodo(id)),
		toggleTodos: () => store.dispatch(toggleTodos()),
		clearCompleted: () => store.dispatch(clearCompleted()),
		editTodo: (id: string) => store.dispatch(editTodo(id)),
		saveTodo: (id: string, label?: string) => store.dispatch(saveTodo(id, label)),
		currentTodo: state.currentTodo,
		completedCount: state.completedCount,
		activeCount: state.activeCount,
		todos: state.todos
	};
}

export const TodoAppContainer = Container(TodoApp, 'application-state', { getProperties });

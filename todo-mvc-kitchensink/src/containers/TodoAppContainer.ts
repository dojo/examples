import { Container } from '@dojo/widget-core/Container';
import Store from '@dojo/stores/Store';

import { TodoApp } from './../widgets/TodoApp';
import {
	addTodoProcess,
	editTodoProcess,
	setCurrentTodoProcess,
	searchProcess,
	clearCompletedProcess,
	toggleTodoProcess,
	toggleTodosProcess,
	Todos,
	Todo,
	removeTodoProcess
} from '../todoProcesses';

function getProperties(store: Store) {
	return {
		todos: Object.keys(store.get<Todos>('/todos')).map(key => store.get<Todo>(`/todos/${key}`)),
		currentTodo: store.get('/currentTodo'),
		addTodo: addTodoProcess(store),
		editTodo: editTodoProcess(store),
		setCurrentTodo: setCurrentTodoProcess(store),
		search: searchProcess(store),
		searchValue: store.get('/currentSearch'),
		completed: store.get('/completed'),
		clearCompleted: clearCompletedProcess(store),
		toggleTodos: toggleTodosProcess(store),
		toggleTodo: toggleTodoProcess(store),
		activeCount: store.get<number>('/todoCount') - store.get<number>('/completedCount'),
		todoCount: store.get('/todoCount'),
		removeTodo: removeTodoProcess(store)
	};
}

export const TodoAppContainer = Container(TodoApp, 'state', { getProperties });

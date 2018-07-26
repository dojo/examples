import Container from '@dojo/framework/widget-core/Container';
import Store from '@dojo/framework/stores/Store';

import TodoApp from './../widgets/TodoApp';
import {
	addTodoProcess,
	editTodoProcess,
	setCurrentTodoProcess,
	searchProcess,
	clearCompletedProcess,
	toggleTodoProcess,
	toggleTodosProcess,
	removeTodoProcess,
	TodoStore
} from '../todoProcesses';

function getProperties(store: Store<TodoStore>) {
	const { get, path } = store;
	return {
		todos: Object.keys(get(path('todos'))).map(key => get(path('todos', key))),
		currentTodo: get(path('currentTodo')),
		addTodo: addTodoProcess(store),
		editTodo: editTodoProcess(store),
		setCurrentTodo: setCurrentTodoProcess(store),
		search: searchProcess(store),
		searchValue: get(path('currentSearch')),
		completed: get(path('completed')),
		clearCompleted: clearCompletedProcess(store),
		toggleTodos: toggleTodosProcess(store),
		toggleTodo: toggleTodoProcess(store),
		activeCount: get(path('todoCount')) - get(path('completedCount')),
		todoCount: get(path('todoCount')),
		removeTodo: removeTodoProcess(store)
	};
}

export default Container(TodoApp, 'state', { getProperties });

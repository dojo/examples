import { Container } from '@dojo/widget-core/Container';

import { TodoAppContext } from './../TodoAppContext';
import { TodoApp } from './../widgets/TodoApp';

function getProperties(todoAppContext: TodoAppContext, properties: any) {
	return {
		todos: todoAppContext.todos,
		currentTodo: todoAppContext.currentTodo,
		addTodo: todoAppContext.addTodo,
		todoInput: todoAppContext.todoInput,
		searchInput: todoAppContext.searchInput,
		searchValue: todoAppContext.currentSearch,
		completed: todoAppContext.completed,
		clearCompleted: todoAppContext.clearCompleted,
		toggleTodos: todoAppContext.toggleTodos,
		toggleTodo: todoAppContext.toggleTodo,
		activeCount: todoAppContext.activeCount,
		todoCount: todoAppContext.todoCount,
		removeTodo: todoAppContext.removeTodo
	};
}

export const TodoAppContainer = Container(TodoApp, 'state', { getProperties });

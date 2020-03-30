import { create, tsx } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import store, { Todo } from '../store';

import TodoItem from './TodoItem';
import TodoCard from './TodoCard';

import * as css from './styles/todoList.m.css';
import TodoDetails from './TodoDetails';

export interface TodoListProperties {
	view: string;
	filter: string;
}

function filterTodos(todos: Todo[], quickFilter: string, filter: string): Todo[] {
	return todos.filter((todo) => {
		return (
			(quickFilter === '' || todo.label.toLowerCase().indexOf(quickFilter.toLowerCase()) >= 0) &&
			((filter === 'completed' && todo.completed) || (filter === 'active' && !todo.completed) || filter === 'all')
		);
	});
}

const factory = create({ theme, store }).properties<TodoListProperties>();

export default factory(function TodoList({ middleware: { store, theme }, properties }) {
	const { view, filter } = properties();
	const { get, path } = store;
	const { cardList, todoList } = theme.classes(css);
	const todos = get(path('todos')) || [];
	const search = get(path('search')) || '';
	const showDetails = !!get(path('editingId'));
	const filteredTodos = filterTodos(todos, search, filter);
	if (filteredTodos.length === 0) {
		return null;
	}
	const todosNodes = filteredTodos.map((todo) => {
		if (view === 'card') {
			return <TodoCard key={todo.id} todo={todo} />;
		}
		return <TodoItem key={todo.id} todo={todo} />;
	});
	return [<ul classes={[view === 'card' && cardList, todoList]}>{todosNodes}</ul>, showDetails && <TodoDetails />];
});

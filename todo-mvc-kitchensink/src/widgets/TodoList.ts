import WidgetBase from '@dojo/widget-core/WidgetBase';
import ThemedMixin, { theme } from '@dojo/widget-core/mixins/Themed';
import { v, w } from '@dojo/widget-core/d';

import { Todo } from './../todoProcesses';
import TodoItem from './TodoItem';
import TodoCard from './TodoCard';
import TodoDetailsOutlet from './../outlets/TodoDetailsOutlet';

import * as css from './styles/todoList.m.css';

export interface TodoListProperties {
	view: string;
	filter: string;
	todos: Todo[];
	searchValue: string;
	toggleTodo: (payload: { id: string }) => void;
	removeTodo: (payload: { id: string }) => void;
	editTodo: (payload: { id: string }) => void;
}

export const TodoListBase = ThemedMixin(WidgetBase);

function filterTodos(todos: Todo[], quickFilter: string, filter: string): Todo[] {
	return todos.filter((todo) => {
		return (quickFilter === '' || 	todo.label.toLowerCase().indexOf(quickFilter.toLowerCase()) >= 0) &&
			(filter === 'completed' && todo.completed || filter === 'active' && !todo.completed || filter === 'all');
	});
}

@theme(css)
export default class TodoList extends TodoListBase<TodoListProperties> {
	protected render() {
		const { todos, searchValue, view, filter, toggleTodo, removeTodo, editTodo } = this.properties;

		return [
			v('ul', { classes: this.theme([ css.todoList, view === 'card' && todos.length > 0 ? css.cardList : null ]) }, filterTodos(todos, searchValue, filter).map((todo) => {
				return view === 'list' ?
					w(TodoItem, { key: todo.id, todo, editTodo, toggleTodo, removeTodo }) :
					w(TodoCard, { key: todo.id, todo, editTodo, toggleTodo, removeTodo });
			})),
			w(TodoDetailsOutlet, { })
		];
	}
}

import Map from '@dojo/framework/shim/Map';
import { from as arrayFrom } from '@dojo/framework/shim/array';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { Outlet } from '@dojo/framework/routing/Outlet';

import { v, w } from '@dojo/framework/widget-core/d';
import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

import * as css from './styles/todoList.m.css';

export interface TodoListProperties {
	todos: Map<string, Todo>;
	updated: string;
	activeFilter?: 'all' | 'active' | 'completed';
	toggleTodo: Function;
	removeTodo: Function;
	editTodo: Function;
	updateTodo: Function;
}

function filter(filterName: string = 'all', todo: Todo): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

function mapFilterRouteParam({ params }: any) {
	return { activeFilter: params.filter };
}

@theme(css)
export default class TodoList extends ThemedMixin(WidgetBase)<TodoListProperties> {
	protected render() {
		const { activeFilter, todos, toggleTodo, editTodo, updateTodo, removeTodo } = this.properties;
		const todoItems = arrayFrom(todos.entries()).filter(([ , value ]) => filter(activeFilter, value));

		return v('ul', { classes: this.theme(css.todoList) }, todoItems.map(([ key, todo ]) => {
			return w(TodoItem, { key, todo, toggleTodo, editTodo, removeTodo, updateTodo });
		}));
	}
}

export const TodoListOutlet = Outlet(TodoList, 'filter', { mapParams: mapFilterRouteParam });

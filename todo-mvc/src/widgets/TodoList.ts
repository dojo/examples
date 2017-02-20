import Map from '@dojo/shim/Map';
import { from as arrayFrom } from '@dojo/shim/array';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { Todo } from './TodoApp';

import * as css from './styles/todoList.css';

export interface TodoListProperties extends WidgetProperties {
	todos: Map<string, Todo>;
	activeFilter: 'all' | 'active' | 'completed';
	toggleTodo: Function;
	removeTodo: Function;
	editTodo: Function;
	updateTodo: Function;
}

export const TodoListBase = ThemeableMixin(WidgetBase);

function filter(filterName: string, todo: Todo): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

@theme(css)
export default class TodoList extends TodoListBase<TodoListProperties> {
	render() {
		const { properties: { activeFilter, todos, toggleTodo, editTodo, updateTodo, removeTodo } } = this;
		const todoItems = arrayFrom(todos.entries()).filter(([ , value ]) => filter(activeFilter, value));

		return v('ul', { id: 'todo-list', classes: this.classes(css.todoList) }, todoItems.map(([ key, todo ]) => {
			return w('todo-item', { key, todo, toggleTodo, editTodo, removeTodo, updateTodo });
		}));
	}
}

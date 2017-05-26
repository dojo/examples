import Map from '@dojo/shim/Map';
import { from as arrayFrom } from '@dojo/shim/array';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { Todo } from './TodoApp';
import { tsx, fromRegistry } from '@dojo/widget-core/tsx';
import { TodoItemProperties } from './TodoItem';

import * as css from './styles/todoList.css';

export interface TodoListProperties extends WidgetProperties {
	updated: string;
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
		const TodoItem = fromRegistry<TodoItemProperties>('todo-item');

		const items = todoItems.map(([ key, todo ]) => (
			<TodoItem
				key={key}
				todo={todo}
				toggleTodo={toggleTodo}
				editTodo={editTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		));

		return (
			<ul id='todo-list' classes={this.classes(css.todoList)}>
				{items}
			</ul>
		);
	}
}

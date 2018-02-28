import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { Todo } from './TodoApp';
import { tsx } from '@dojo/widget-core/tsx';
import TodoItem from './TodoItem';

import * as css from './styles/todoList.m.css';

export interface TodoListProperties extends WidgetProperties {
	filter: string;
	todos: Todo[];
	toggleTodo: (id: string) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
}

export const TodoListBase = ThemedMixin(WidgetBase);

function filterTodos(todos: Todo[], filter: string): Todo[] {
	return todos.filter((todo) => {
		return filter === 'completed' && todo.completed || filter === 'active' && !todo.completed || filter === 'all';
	});
}

@theme(css)
export class TodoList extends TodoListBase<TodoListProperties> {
	protected render(): DNode {
		const { filter, todos, toggleTodo, removeTodo, saveTodo, editTodo } = this.properties;
		const items = filterTodos(todos, filter).map((todo) => (
			<TodoItem
				key={todo.id}
				todo={todo}
				toggleTodo={toggleTodo}
				editTodo={editTodo}
				saveTodo={saveTodo}
				removeTodo={removeTodo}
			/>
		));

		return (
			<ul classes={this.theme(css.todoList)}>
				{items}
			</ul>
		);
	}
}

export default TodoList;

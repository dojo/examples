import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v, w } from '@dojo/widget-core/d';
import { Todo } from './TodoApp';
import TodoItem from './TodoItem';

import * as css from './styles/todoList.css';

export interface TodoListProperties extends WidgetProperties {
	filter: string;
	todos: Todo[];
	toggleTodo: (id: string, completed: boolean) => void;
	removeTodo: (id: string) => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
}

function filterTodos(todos: Todo[], filter: string): Todo[] {
	return todos.filter((todo) => {
		return filter === 'completed' && todo.completed || filter === 'active' && !todo.completed || filter === 'all';
	});
}

export const TodoListBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoList extends TodoListBase<TodoListProperties> {
	protected render(): DNode {
		const { filter, todos, toggleTodo, removeTodo, saveTodo, editTodo } = this.properties;
		const items = filterTodos(todos, filter).map((todo) => w<TodoItem>('todo-item', { key: todo.id, todo, toggleTodo, editTodo, saveTodo, removeTodo } ));

		return v('ul', { classes: this.classes(css.todoList) }, items);
	}
}

export default TodoList;

import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { w, v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';

import { TodoHeader } from './TodoHeader';
import { TodoListOutlet } from './../outlets/TodoListOutlet';
import { TodoFooterOutlet } from './../outlets/TodoFooterOutlet';

import * as css from './styles/todoApp.css';

export interface Todo {
	id: string;
	label: string;
	completed: boolean;
	editing?: boolean;
}

export interface TodoAppProperties extends WidgetProperties {
	todos: Todo[];
	currentTodo: string;
	activeCount: number;
	completedCount: number;
	addTodo: () => void;
	editTodo: (id: string) => void;
	saveTodo: (id: string, label?: string) => void;
	todoInput: (id: string) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string, completed: boolean) => void;
	toggleTodos: () => void;
	clearCompleted: () => void;
}

export const TodoAppBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoApp extends TodoAppBase<TodoAppProperties> {

	protected render(): DNode {
		const {
			activeCount,
			todos,
			currentTodo,
			completedCount,
			addTodo,
			editTodo,
			todoInput,
			removeTodo,
			toggleTodo,
			toggleTodos,
			clearCompleted,
			saveTodo
		} = this.properties;

		const todoCount = todos.length;
		const allCompleted = todoCount > 0 && completedCount === todoCount;

		return v('section', { classes: this.classes(css.todoapp) }, [
			w<TodoHeader>('todo-header', { todo: currentTodo, todoInput, allCompleted, addTodo, toggleTodos, todoCount }),
			v('section', {}, [
				w(TodoListOutlet, { todos, editTodo, removeTodo, toggleTodo, saveTodo })
			]),
			todoCount ? w(TodoFooterOutlet, { clearCompleted, activeCount, todoCount }) : null
		]);
	}
}

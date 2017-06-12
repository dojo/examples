import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import  { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';

import { TodoListOutlet } from './../outlets/TodoListOutlet';
import { TodoFooterOutlet } from './../outlets/TodoFooterOutlet';
import { TodoHeader } from './TodoHeader';
import { TodoSearch } from './TodoSearch';

import * as css from './styles/todoApp.m.css';

export interface TodoAppProperties {
	todos: any;
	currentTodo: string;
	searchValue: string;
	activeCount: number;
	todoCount: number;
	completed: boolean;
	addTodo: () => void;
	editTodo: (id: string) => void;
	todoInput: (id: string) => void;
	searchInput: (id: string) => void;
	removeTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	toggleTodos: () => void;
	clearCompleted: () => void;

}

export const TodoAppBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoApp extends TodoAppBase<TodoAppProperties> {
	protected render(): DNode {
		const {
			todos,
			addTodo,
			todoInput,
			completed: allCompleted,
			toggleTodos,
			editTodo,
			removeTodo,
			toggleTodo,
			currentTodo: todo,
			searchInput,
			searchValue,
			todoCount,
			activeCount,
			clearCompleted
		} = this.properties;

		return v('section', { classes: this.classes(css.todoapp) }, [
			w(TodoHeader, {
				allCompleted,
				todoCount,
				toggleTodos,
				addTodo,
				todo,
				todoInput
			}),
			todoCount > 0 ? w(TodoSearch, { searchInput, searchValue }) : null,
			todoCount > 0 ? w(TodoListOutlet, { todos, searchValue, toggleTodo, removeTodo, editTodo }) : null,
			todoCount > 0 ? w(TodoFooterOutlet, { activeCount, todoCount, clearCompleted }) : null
		]);
	}
}

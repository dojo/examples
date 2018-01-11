import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import  { v, w } from '@dojo/widget-core/d';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';

import { ThemeSwitcherContainer } from './../containers/ThemeSwitcherContainer';
import { TodoListOutlet } from './../outlets/TodoListOutlet';
import { TodoFooterOutlet } from './../outlets/TodoFooterOutlet';
import { TodoHeader } from './TodoHeader';
import { TodoSearch } from './TodoSearch';
import { Credits } from './Credits';
import { Todo } from './../todoProcesses';

import * as css from './styles/todoApp.m.css';

export interface TodoAppProperties {
	todos: Todo[];
	currentTodo: string;
	searchValue: string;
	activeCount: number;
	todoCount: number;
	completed: boolean;
	addTodo: (payload: object) => void;
	editTodo: (payload: { id: string }) => void;
	setCurrentTodo: (payload: { todo: string }) => void;
	search: (payload: { search: string }) => void;
	removeTodo: (payload: { id: string }) => void;
	toggleTodo: (payload: { id: string }) => void;
	toggleTodos: (payload: object) => void;
	clearCompleted: (payload: object) => void;
}

export const TodoAppBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoApp extends TodoAppBase<TodoAppProperties> {
	protected render() {
		const {
			todos,
			addTodo,
			completed: allCompleted,
			toggleTodos,
			editTodo,
			removeTodo,
			toggleTodo,
			currentTodo: todo,
			setCurrentTodo,
			search,
			searchValue,
			todoCount,
			activeCount,
			clearCompleted
		} = this.properties;

		return v('div', {}, [
				v('section', { classes: this.theme(css.todoapp) }, [
				w(ThemeSwitcherContainer, {}),
				w(TodoHeader, {
					allCompleted,
					todo,
					todoCount,
					toggleTodos,
					addTodo,
					setCurrentTodo
				}),
				todoCount > 0 ? w(TodoSearch, { search, searchValue }) : null,
				todoCount > 0 ? w(TodoListOutlet, { todos, searchValue, toggleTodo, removeTodo, editTodo }) : null,
				todoCount > 0 ? w(TodoFooterOutlet, { activeCount, todoCount, clearCompleted }) : null
			]),
			w(Credits, {})
		]);
	}
}

import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';

import ThemeSwitcherContainer from './../containers/ThemeSwitcherContainer';
import TodoHeader from './TodoHeader';
import TodoSearch from './TodoSearch';
import Credits from './Credits';
import { Todo } from './../todoProcesses';

import * as css from './styles/todoApp.m.css';
import Outlet from '@dojo/framework/routing/Outlet';
import { MatchDetails } from '@dojo/framework/routing/interfaces';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';

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

@theme(css)
export default class TodoApp extends ThemedMixin(WidgetBase)<TodoAppProperties> {
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
				todoCount > 0 ? w(Outlet, { key: 'list-view', id: 'view', renderer: ({ router, params, queryParams }: MatchDetails) => {
					return w(TodoList, {
						todos,
						searchValue,
						toggleTodo,
						removeTodo,
						view: params.view,
						filter: queryParams.filter,
						editTodo({ id }: {id: string}) {
							const link = router.link('edit', { id });
							link && router.setPath(link);
						}});
				}}) : null,
				todoCount > 0 ? w(Outlet, { key: 'footer-view', id: 'view', renderer: ({ params, queryParams }: MatchDetails) => {
					return w(TodoFooter, { view: params.view, filter: queryParams.filter, activeCount, todoCount, clearCompleted });
				}}) : null
			]),
			w(Credits, {})
		]);
	}
}

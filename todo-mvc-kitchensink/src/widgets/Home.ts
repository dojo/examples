import Map from '@dojo/shim/Map';
import { v, w } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import { Todo } from './App';
import MainSection from './MainSection';
import * as styles from './styles/Home.css';
import Title from './Title';
import TodoEditInput from './TodoEditInput';
import TodoFooter from './TodoFooter';

export interface HomeProperties extends WidgetProperties, ThemeableProperties, I18nProperties {
	updated: string;
	todos: Map<string, Todo>;
	todo: string;
	activeView: string;
	activeFilter: string;
	completedCount: number;
	search: string;
	addTodo: Function;
	updateTodoItem: Function;
	clearCompleted: Function;
	showTodoDetails: Function;
	removeTodo: Function;
	toggleTodo: Function;
	updateSearch: Function;
	toggleAllTodos: Function;
}

@theme(styles)
export default class Home extends I18nMixin(ThemeableMixin(WidgetBase))<HomeProperties> {
	render() {
		const messages = this.localizeBundle(appBundle);

		const { todo, todos, completedCount, theme, search } = this.properties;

		const activeCount = todos.size - completedCount;

		return v('div', [
			v('header', [
				w(Title, { label: messages.appTitle }),
				w(TodoEditInput, {
					focused: true,
					value: todo,
					placeholder: messages.editPlaceholder,
					onKeyUp: this._addTodo,
					onInput: this._updateTodo,
					theme: theme
				})
			]),
			w(MainSection, {
				updated: this.properties.updated,
				todos: todos,
				search: search,
				completedCount,
				showTodoDetails: this._showTodoDetails,
				removeTodo: this._removeTodo,
				toggleTodo: this._toggleTodo,
				updateSearch: this._updateSearch,
				toggleAllTodos: this._toggleAllTodos
			}),
			todos.size ? w(TodoFooter, {
				theme,
				completedCount,
				activeCount,
				clearCompleted: this._clearCompleted
			}) : null
		]);
	}

	private _addTodo({ which, target: { value: label } }: any) {
		if (which === 13 && label) {
			this.properties.addTodo({ label, completed: false });
		}
	}

	private _updateTodo({ target: { value: label } }: any) {
		this.properties.updateTodoItem(label);
	}

	private _clearCompleted() {
		this.properties.clearCompleted();
	}

	private _toggleAllTodos() {
		this.properties.toggleAllTodos();
	}

	private _showTodoDetails(id: string) {
		this.properties.showTodoDetails(id);
	}

	private _removeTodo(id: string) {
		this.properties.removeTodo(id);
	}

	private _toggleTodo(id: string) {
		this.properties.toggleTodo(id);
	}

	private _updateSearch(value: string) {
		this.properties.updateSearch(value);
	}
}

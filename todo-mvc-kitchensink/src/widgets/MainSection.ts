import Map from '@dojo/shim/Map';
import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import { Todo } from './App';
import CheckboxInput from './CheckboxInput';
import SearchInput from './SearchInput';
import * as styles from './styles/MainSection.css';
import TodoItemList from './TodoItemList';

interface MainSectionProperties extends ThemeableProperties, I18nProperties {
	updated: string;
	completedCount: number;
	todos: Map<string, Todo>;
	activeFilter?: string;
	activeView?: string;
	search: string;
	updateSearch: Function;
	toggleAllTodos: Function;
	toggleTodo: Function;
	showTodoDetails: Function;
	removeTodo: Function;
}

@theme(styles)
export default class MainSection extends I18nMixin(ThemeableMixin(WidgetBase))<MainSectionProperties> {
	render() {
		const messages = this.localizeBundle(appBundle);

		const {
			todos,
			completedCount,
			activeFilter = 'all',
			activeView = 'list',
			search = '',
			theme,
			updated
		} = this.properties;

		return v('section', {
			classes: this.classes(styles.main)
		}, [
			w(CheckboxInput, {
				checked: completedCount === todos.size,
				onChange: this._todoToggleAll,
				theme
			}),
			todos.size ? v('div', {
				classes: this.classes(styles.searchBar)
			}, [
				v('span', {
					classes: this.classes(styles.searchIcon)
				}), w(SearchInput, {
					placeholder: messages.searchPlaceholder,
					value: search,
					onKeyUp: this._searchHandler,
					theme
				})
			]) : null,
			w(TodoItemList, {
				updated,
				theme,
				todos,
				activeFilter,
				activeView,
				search,
				key: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}`,
				showTodoDetails: this._showTodoDetails,
				removeTodo: this._removeTodo,
				toggleTodo: this._toggleTodo
			})
		]);
	}

	private _searchHandler({ target: { value } }: any) {
		this.properties.updateSearch(value);
	}

	private _todoToggleAll() {
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
}

import { from as arrayFrom } from '@dojo/shim/array';
import Map from '@dojo/shim/Map';
import { w, v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Todo } from './App';
import * as styles from './styles/TodoItemList.m.css';

interface TodoListProperties extends ThemeableProperties {
	updated: string;
	activeFilter: string;
	activeView: string;
	todos: Map<string, Todo>;
	search: string;
	showTodoDetails: Function;
	removeTodo: Function;
	toggleTodo: Function;
}

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

function applySearch(searchQuery: string, todo: Todo): boolean {
	return searchQuery === '' || (todo.label || '').toLowerCase().indexOf(searchQuery) >= 0;
}

@theme(styles)
export default class TodoItemList extends ThemeableMixin(WidgetBase)<TodoListProperties> {
	render() {
		const { activeView = 'list', todos, activeFilter = '', search = '', theme } = this.properties;

		return v('ul', {
			classes: this.classes(
				styles.todoItemList,
				todos.size === 0 ? styles.empty : null,
				activeView === 'cards' ? styles.cardList : null
			)
		}, arrayFrom(todos.values())
			.filter((todo: Todo) => filter(activeFilter, todo))
			.filter((todo: Todo) => applySearch(search.toLowerCase(), todo))
			.map((todo: Todo) => <DNode> w('todo-item', {
				todo,
				key: `${activeView}-${todo.id}`,
				type: <'card' | 'list'> (activeView === 'cards' ? 'card' : 'list'),
				theme,
				editTodo: this._showTodoDetails,
				removeTodo: this._removeTodo,
				toggleTodo: this._toggleTodo
			}))
			.concat((activeView === 'cards' && todos.size) ? [
				v('li', {
					classes: this.classes(styles.emptyFiller)
				}),
				v('li', {
					classes: this.classes(styles.emptyFiller)
				})
			] : []));
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

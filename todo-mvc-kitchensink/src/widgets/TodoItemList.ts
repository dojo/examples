import { w, v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Item } from '../App';
import * as styles from './styles/TodoItemList.css';
import TodoCardItem from './TodoCardItem';
import TodoListItem from './TodoListItem';

interface TodoListProperties extends ThemeableProperties {
	activeFilter: string;
	activeView: string;
	todos: Item[];
	search: string;
}

function filter(filterName: string, todo: Item): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

function applySearch(searchQuery: string, todo: Item): boolean {
	return searchQuery === '' || (todo.label || '').toLowerCase().indexOf(searchQuery) >= 0;
}

@theme(styles)
export default class TodoItemList extends ThemeableMixin(WidgetBase)<TodoListProperties> {
	render() {
		const { activeView = 'list', todos = [], activeFilter = '', search = '', theme } = this.properties;

		return v('ul', {
			classes: this.classes(
				styles.todoItemList,
				todos.length === 0 ? styles.empty : null,
				activeView === 'cards' ? styles.cardList : null
			)
		}, todos
			.filter((todo: Item) => filter(activeFilter, todo))
			.filter((todo: Item) => applySearch(search.toLowerCase(), todo))
			.map((todo: Item) => <DNode> w(activeView === 'cards' ? TodoCardItem : TodoListItem, <any> {
				...todo,
				todoId: todo.id,
				key: todo.id,
				theme
			}))
			.concat((activeView === 'cards' && todos.length) ? [
				v('li', {
					classes: this.classes(styles.emptyFiller)
				}),
				v('li', {
					classes: this.classes(styles.emptyFiller)
				})
			] : []));
	}
}

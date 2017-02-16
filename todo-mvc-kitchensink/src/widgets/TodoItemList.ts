import { w, v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { Item } from '../App';
import TodoCardItem from './TodoCardItem';
import TodoListItem from './TodoListItem';
import * as styles from './styles/todoitemlist.css';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';

interface TodoListProperties {
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
		const { activeView = 'list', todos = [], activeFilter = '', search = '' } = this.properties;

		let classList = [styles.todoItemList];

		if(activeView === 'cards') {
			classList.push(styles.cardList);
		}

		if(todos.length === 0) {
			classList.push(styles.empty);
		}

		return v('ul', {
			classes: this.classes(...classList).get()
		}, todos
			.filter((todo: Item) => filter(activeFilter, todo))
			.filter((todo: Item) => applySearch(search.toLowerCase(), todo))
			.map((todo: Item) => <DNode> w(activeView === 'cards' ? TodoCardItem : TodoListItem, <any> {
				...todo,
				todoId: todo.id,
				key: todo.id
			}))
			.concat((activeView === 'cards' && todos.length) ? [
					v('li', {
						classes: this.classes(styles.emptyFiller).get()
					}),
					v('li', {
						classes: this.classes(styles.emptyFiller).get()
					})
				] : []));
	}
}

import { w, v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import { Item } from '../App';
import TodoCardItem from './TodoCardItem';
import TodoListItem from './TodoListItem';

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

export default class TodoItemList extends WidgetBase<TodoListProperties> {
	render() {
		const { activeView = 'list', todos = [], activeFilter = '', search = '' } = this.properties;

		return v('ul', {
			classes: {
				'todo-list': true,
				'card-list': activeView === 'cards',
				'empty': todos.length === 0
			}
		}, todos
			.filter((todo: Item) => filter(activeFilter, todo))
			.filter((todo: Item) => applySearch(search.toLowerCase(), todo))
			.map((todo: Item) => <DNode> w(activeView === 'cards' ? TodoCardItem : TodoListItem, <any> {
				...todo,
				todoId: todo.id,
				key: todo.id
			}))
			.concat((activeView === 'cards' && todos.length) ? [
					v('li.empty-filler', {}),
					v('li.empty-filler', {})
				] : []));
	}
}

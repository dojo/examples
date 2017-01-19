import { Widget, DNode, WidgetProperties } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { w, v } from '@dojo/widgets/d';
import { Item } from '../stores/todoStore';
import createTodoListItem from './createTodoListItem';
import createTodoCardItem from './createTodoCardItem';
import { VNodeProperties } from '@dojo/interfaces/vdom';

type TodoListProperties = {
	activeFilter: string;
	activeView: string;
	todos: Item[];
	search: string;
};

export type TodoList = Widget<TodoListProperties>;

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

const createTodoItemList = createWidgetBase.mixin({
	mixin: {
		tagName: 'ul',
		classes: [ 'todo-list' ],
		nodeAttributes: [
			function (this: TodoList): VNodeProperties {
				const { activeView = 'list', todos = [] } = this.state;

				return {
					classes: {
						'card-list': activeView === 'cards',
						'empty': todos.length === 0
					}
				};
			}
		],
		getChildrenNodes: function (this: TodoList): DNode[] {
			const activeFilter = this.properties.activeFilter || '';
			const todos = this.properties.todos || [];
			const search = this.properties.search || '';
			const activeView = this.properties.activeView || 'list';

			return todos
				.filter((todo: Item) => filter(activeFilter, todo))
				.filter((todo: Item) => applySearch(search.toLowerCase(), todo))
				.map((todo: Item) => <DNode> w(activeView === 'cards' ? createTodoCardItem : createTodoListItem, <WidgetProperties> {
					...todo,
					todoId: todo.id,
					id: todo.id
				}))
				.concat((activeView === 'cards' && todos.length) ? [
						v('li.empty-filler', {}),
						v('li.empty-filler', {})
					] : null);
		}
	}
});

export default createTodoItemList;

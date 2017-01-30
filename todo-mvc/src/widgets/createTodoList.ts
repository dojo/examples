import { Widget, WidgetFactory, WidgetProperties, DNode } from '@dojo/widget-core/interfaces';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { w } from '@dojo/widget-core/d';
import { assign } from '@dojo/core/lang';
import { Item } from './../stores/todoStore';

export interface TodoListProperties extends WidgetProperties { }

export type TodoList = Widget<TodoListProperties>

export interface TodoListFactory extends WidgetFactory<TodoList, TodoListProperties> {}

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

const createTodoList: TodoListFactory = createWidgetBase
	.mixin({
		mixin: {
			tagName: 'ul',
			classes: [ 'todo-list' ],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const { todos = [], activeFilter = '' } = this.properties;

				return todos
					.filter((todo: Item) => filter(activeFilter, todo))
					.map((todo: Item) => w('todo-item', assign(<any> {}, <any> { key: todo.id }, todo)));
			}
		}
	});

export default createTodoList;

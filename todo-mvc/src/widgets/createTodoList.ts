import { Widget, WidgetFactory, WidgetProperties, DNode } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { w } from '@dojo/widgets/d';
import createTodoItem, { TodoItemProperties } from './createTodoItem';

export interface TodoListProperties extends WidgetProperties {
	activeFilter?: string;
	todos?: TodoItemProperties[];
}

export type TodoList = Widget<TodoListProperties>;

export interface TodoListFactory extends WidgetFactory<TodoList, TodoListProperties> {}

function filter(filterName: string, todo: TodoItemProperties): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

const createTodoList: TodoListFactory = createWidgetBase.mixin({
		mixin: {
			tagName: 'ul',
			classes: [ 'todo-list' ],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const activeFilter = this.properties.activeFilter || '';
				const todos = this.properties.todos || [];
				return todos
					.filter((todo) => filter(activeFilter, todo))
					.map((todo) => w(createTodoItem, todo));
			}
		}
	});

export default createTodoList;

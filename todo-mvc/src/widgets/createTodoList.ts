import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';
import createTodoItem, { TodoItemState } from './createTodoItem';

type TodoListState = WidgetState & {
	activeFilter: string;
	todos: TodoItemState[];
};

type TodoListProperties = {
	activeFilter: string;
	todos: TodoItemState[];
}

type TodoListOptions = WidgetOptions<TodoListState, TodoListProperties>;

export type TodoList = Widget<TodoListState, TodoListProperties>;

function filter(filterName: string, todo: TodoItemState): boolean {
	switch (filterName) {
		case 'completed':
			return !!todo.completed;
		case 'active':
			return !todo.completed;
		default:
			return true;
	}
}

const createTodoList = createWidgetBase.mixin({
		mixin: {
			tagName: 'ul',
			classes: [ 'todo-list' ],
			getChildrenNodes: function(this: TodoList): DNode[] {
				const activeFilter = this.state.activeFilter || '';
				const todos = this.state.todos || [];
				return todos
					.filter((todo) => filter(activeFilter, todo))
					.map((todo) => w(createTodoItem, { id: todo.id, properties: todo }));
			}
		}
	});

export default createTodoList;

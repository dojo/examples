import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
import createTodoItem, { TodoItemState } from './createTodoItem';

type TodoListState = WidgetState & {
	activeFilter?: string;
	todos: TodoItemState[];
};

type TodoListOptions = WidgetOptions<TodoListState>;

export type TodoList = Widget<TodoListState>;

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

const createTodoList = createWidgetBase
	.extend({
		childNodeRenderers: [
			function(this: TodoList): DNode[] {
				const activeFilter = this.state.activeFilter || '';
				const todos = this.state.todos || [];
				return todos
					.filter((todo) => filter(activeFilter, todo))
					.map((todo) => d(createTodoItem, { id: todo.id, state: todo }));
				}
		],
		tagName: 'ul'
	});

export default createTodoList;

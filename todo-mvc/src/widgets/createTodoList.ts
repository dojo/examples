import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
import createTodoItem, { TodoItem, TodoItemState } from './createTodoItem';

type TodoListState = WidgetState & {
	activeFilter?: string;
	todos: TodoItem[];
};

type TodoListOptions = WidgetOptions<TodoListState>;

export type TodoList = Widget<TodoListState>;

function filter(filterName: string, todo: TodoItemState): boolean {
	switch (filterName) {
		case 'completed':
			return todo.completed;
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
				const todos = this.state.todos || [];
				return todos
					.filter((todo: any) => filter(this.state.activeFilter, todo))
					.map((todo: any) => d(createTodoItem, { id: todo.id, state: todo }));
				}
		],
		tagName: 'ul'
	});

export default createTodoList;

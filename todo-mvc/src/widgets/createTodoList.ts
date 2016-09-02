import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentList, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { VNode } from 'maquette';
import { List } from 'immutable';

import { TodoItem } from './createTodoItem';

interface TodoListState extends WidgetState, StatefulChildrenState {
	activeFilter?: string;
}

interface TodoListOptions extends WidgetOptions<TodoListState>, ParentListMixinOptions<TodoItem>, StatefulChildrenOptions<Child, TodoListState> { }

export type TodoList = Widget<TodoListState> & ParentList<TodoItem>;

function filterCompleted(children: List<TodoItem>): List<TodoItem> {
	return <List<TodoItem>> children.filter((child: TodoItem) => {
		return child.state.completed;
	});
}

function filterActive(children: List<TodoItem>): List<TodoItem> {
	return <List<TodoItem>> children.filter((child: TodoItem) => {
		return !child.state.completed;
	});
}

const createTodoList = createWidget
	.mixin(createParentMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		tagName: 'ul',

		getChildrenNodes(): (VNode | string)[] {
			const todoList: TodoList = this;
			const results: (VNode | string)[] = [];
			const { children } = todoList;
			let filteredChildren: List<TodoItem> = children;

			if (todoList.state.activeFilter === 'completed') {
				filteredChildren = filterCompleted(children);
			} else if (todoList.state.activeFilter === 'active') {
				filteredChildren = filterActive(children);
			}
			filteredChildren.forEach((child: Child) => results.push(child.render()));
			return results;
		}
	});

export default createTodoList;

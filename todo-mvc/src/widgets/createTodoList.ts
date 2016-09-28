import createParentListMixin, { ParentList, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import { VNode } from 'maquette';
import { List } from 'immutable';

import { TodoItem } from './createTodoItem';

type TodoListState = RenderMixinState & StatefulChildrenState & {
	activeFilter?: string;
};

type TodoListOptions = RenderMixinOptions<TodoListState> & ParentListMixinOptions<TodoItem> & StatefulChildrenOptions<TodoItem, TodoListState>;

export type TodoList = RenderMixin<TodoListState> & ParentList<TodoItem> & {
	children: List<TodoItem>;
};

function filterCompleted(children: List<TodoItem>): List<TodoItem> {
	return <List<TodoItem>> children.filter((child) => {
		return child.state.completed;
	});
}

function filterActive(children: List<TodoItem>): List<TodoItem> {
	return <List<TodoItem>> children.filter((child) => {
		return !child.state.completed;
	});
}

const createTodoList = createRenderMixin
	.mixin(createParentListMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		getChildrenNodes(this: TodoList): (VNode | string)[] {
			const results: (VNode | string)[] = [];
			const { children } = this;
			let filteredChildren = children;

			if (this.state.activeFilter === 'completed') {
				filteredChildren = filterCompleted(children);
			}
			else if (this.state.activeFilter === 'active') {
				filteredChildren = filterActive(children);
			}
			filteredChildren.forEach((child) => results.push(child.render()));
			return results;
		},

		tagName: 'ul'
	});

export default createTodoList;

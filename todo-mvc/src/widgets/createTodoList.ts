import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createParentListMixin, { ParentList, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import { VNode } from 'maquette';
import { List } from 'immutable';

import { TodoItem } from './createTodoItem';

interface TodoListState extends WidgetState, StatefulChildrenState {
	activeFilter?: string;
}

type TodoListOptions = WidgetOptions<TodoListState> & ParentListMixinOptions<TodoItem> & StatefulChildrenOptions<TodoItem, TodoListState>;

export type TodoList = Widget<TodoListState> & ParentList<TodoItem> & {
	children: List<TodoItem>;
}

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

const createTodoList = createWidget
	.mixin(createParentListMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.extend({
		tagName: 'ul',

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
		}
	});

export default createTodoList;

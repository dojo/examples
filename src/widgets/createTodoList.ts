import createWidget from 'dojo-widgets/createWidget';
import createParentMixin from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin, { RenderableChildrenMixin } from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';
import { VNode } from 'maquette/maquette';
import { List } from 'immutable/immutable';

function filterCompleted(children: List<Child>): List<Child> {
	return <List<Child>> children.filter((child: any) => {
		return child.state.completed;
	});
}

function filterActive(children: List<Child>): List<Child> {
	return <List<Child>> children.filter((child: any) => {
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
			const renderableChildren: RenderableChildrenMixin & {
				state: any;
				children: List<Child>;
			} = this;
			const results: (VNode | string)[] = [];
			const { children } = renderableChildren;
			let filteredChildren: List<Child> = children;

			if (renderableChildren.state.activeFilter === 'completed') {
				filteredChildren = filterCompleted(children);
			} else if (renderableChildren.state.activeFilter === 'active') {
				filteredChildren = filterActive(children);
			}
			filteredChildren.forEach((child: Child) => results.push(child.render()));
			return results;
		}
	});

export default createTodoList;

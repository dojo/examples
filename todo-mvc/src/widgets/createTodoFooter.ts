import createButton from 'dojo-widgets/createButton';
import createParentMapMixin, { ParentMap, ParentMapMixinOptions } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette';

import createTodoFilter from './createTodoFilter';
import { clearCompleted } from '../actions/uiTodoActions';

export type TodoFooterState = RenderMixinState & StatefulChildrenState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
};

export type TodoFooterOptions = RenderMixinOptions<TodoFooterState> & ParentMapMixinOptions<Child> & StatefulChildrenOptions<Child, TodoFooterState>;

export type TodoFooter = RenderMixin<TodoFooterState> & ParentMap<RenderMixin<TodoFooterState>>;

function manageChildren(this: TodoFooter) {
	const filterWidget = this.children.get('filter');
	const buttonWidget = this.children.get('button');

	filterWidget.setState({
		activeFilter: this.state.activeFilter
	});

	const clearCompletedButtonClasses = ['clear-completed'];
	if (this.state.completedCount === 0) {
		clearCompletedButtonClasses.push('hidden');
	}

	buttonWidget.setState({
		classes: clearCompletedButtonClasses
	});
}

const createTodoFooter = createRenderMixin
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: createParentMapMixin,
		initialize(instance) {
			const filterWidget = createTodoFilter({
				state: {
					id: 'filter',
					classes: ['filters']
				}
			});
			const clearCompletedButton = createButton({
				state: {
					id: 'button',
					label: 'Clear completed',
					classes: ['clear-completed']
				},
				listeners: {
					click: clearCompleted
				}
			});
			instance.append([filterWidget, clearCompletedButton]);
			instance.on('statechange', manageChildren);
		}
	})
	.extend({
		getChildrenNodes(this: TodoFooter): VNode[] {
			const activeCount = this.state.activeCount;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				h('span', {'class': 'todo-count'}, [
					h('strong', [activeCount + ' ']),
					h('span', [countLabel + ' left'])
				]),
				this.children.get('filter').render(),
				this.children.get('button').render()
			];
		},

		tagName: 'footer'
	});

export default createTodoFooter;

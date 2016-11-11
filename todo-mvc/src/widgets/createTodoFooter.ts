import { Messages } from 'dojo-i18n/i18n';
import createButton from 'dojo-widgets/createButton';
import createI18nMixin, { I18nMixin, I18nOptions, I18nState } from 'dojo-widgets/mixins/createI18nMixin';
import createParentMapMixin, { ParentMap, ParentMapMixinOptions } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette';

import { clearCompleted } from '../actions/userActions';
import bundle from '../nls/main';
import createTodoFilter from './createTodoFilter';

export type TodoFooterState = RenderMixinState & StatefulChildrenState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
};

export type TodoFooterOptions = I18nOptions & RenderMixinOptions<TodoFooterState> & ParentMapMixinOptions<Child> & StatefulChildrenOptions<Child, TodoFooterState>;

export type TodoFooter = RenderMixin<TodoFooterState> & ParentMap<RenderMixin<TodoFooterState>> & I18nMixin<Messages, I18nState>;

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
	.mixin(createI18nMixin)
	.mixin({
		mixin: createParentMapMixin,
		initialize(instance, options) {
			const filterWidget = createTodoFilter({
				state: {
					id: 'filter',
					classes: ['filters']
				}
			});
			const clearCompletedButton = createButton({
				bundles: [ bundle ],
				state: {
					id: 'button',
					classes: ['clear-completed'],
					labels: {
						label: 'nls/main:clearCompleted'
					}
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
			const messages = this.localizeBundle(bundle);
			const countLabel = activeCount === 1 ? 'itemLeft' : 'itemsLeft';

			return [
				h('span', {'class': 'todo-count'}, [
					h('strong', [activeCount + ' ']),
					h('span', [ messages[countLabel] ])
				]),
				this.children.get('filter').render(),
				this.children.get('button').render()
			];
		},

		bundles: [ bundle ],
		tagName: 'footer'
	});

export default createTodoFooter;

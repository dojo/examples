import createButton from 'dojo-widgets/createButton';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentMap, ParentMapMixinOptions } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { h, VNode } from 'maquette';

import createTodoFilter from './createTodoFilter';
import { clearCompleted } from '../actions/uiTodoActions';

export interface TodoFooterState extends WidgetState, StatefulChildrenState {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
}

export interface TodoFooterOptions extends WidgetOptions<TodoFooterState>, ParentMapMixinOptions<Child>, StatefulChildrenOptions<Child, TodoFooterState> { }

export type TodoFooter = Widget<TodoFooterState> & ParentMap<Widget<TodoFooterState>>;

function manageChildren() {
	const todoFooter = <TodoFooter> this;
	const filterWidget = todoFooter.children.get('filter');
	const buttonWidget = todoFooter.children.get('button');

	filterWidget.setState({
		'activeFilter': todoFooter.state.activeFilter
	});

	const clearCompletedButtonClasses = ['clear-completed'];
	if (todoFooter.state.completedCount === 0) {
		clearCompletedButtonClasses.push('hidden');
	}

	buttonWidget.setState({
		'classes': clearCompletedButtonClasses
	});
}

const createTodoFooter = createWidget
	.mixin(createParentMixin)
	.mixin(createRenderableChildrenMixin)
	.mixin(createStatefulChildrenMixin)
	.mixin({
		mixin: createParentMixin,
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
					label: 'Clear Completed',
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
	.mixin({
		mixin: {
			getChildrenNodes(): VNode[] {
				const todoFooter = <TodoFooter> this;
				const activeCount = todoFooter.state.activeCount;
				const countLabel = activeCount === 1 ? 'item' : 'items';

				return [
					h('span', {'class': 'todo-count'}, [
						h('strong', [activeCount + ' ']),
						h('span', [countLabel])
					]),
					todoFooter.children.get('filter').render(),
					todoFooter.children.get('button').render()
				];
			}
		}
	});

export default createTodoFooter;

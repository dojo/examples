import { h, VNode } from 'maquette/maquette';
import createWidget, { Widget, WidgetState } from 'dojo-widgets/createWidget';
import createParentMixin, { ParentMap } from 'dojo-widgets/mixins/createParentMapMixin';
import createRenderableChildrenMixin, {} from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createButton from 'dojo-widgets/createButton';
import createTodoFilter from './createTodoFilter';

type TodoFooter = ParentMap<Widget<WidgetState>>;

function manageChildren(parent: any) {
	const todoFooter = <TodoFooter> this;
	const filterWidget = todoFooter.children.get('filter');
	const buttonWidget = todoFooter.children.get('button');

	filterWidget.setState({
		'activeFilter': (<any> todoFooter).state.activeFilter
	});

	const clearCompletedButtonClasses = ['clear-completed'];
	if ((<any> todoFooter).state.completedCount === 0) {
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
				'state': {
					'id': 'filter',
					'classes': ['filters']
				}
			});
			const clearCompletedButton = createButton({
				'state': {
					'id': 'button',
					'label': 'Clear Completed',
					'classes': ['clear-completed']
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
				const activeCount = (<any> todoFooter).state.activeCount;
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


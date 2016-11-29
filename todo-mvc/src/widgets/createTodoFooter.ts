import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';
import createButton from 'dojo-widgets/createButton';

export type TodoFooterState = WidgetState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
};

export type TodoFooterOptions = WidgetOptions<TodoFooterState>;

export type TodoFooter = Widget<TodoFooterState>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		childNodeRenderers: [
			function(this: TodoFooter): (DNode | null)[] {
				const { activeCount, activeFilter, completedCount } = this.state;
				const countLabel = activeCount === 1 ? 'item' : 'items';

				return [
					d('span', { 'class': 'todo-count' }, [
						d('strong', [activeCount + ' ']),
						d('span', [countLabel + ' left'])
					]),
					d(createTodoFilter, {
						state: {
							classes: [ 'filters' ],
							activeFilter
						}
					}),
					completedCount ? d(createButton, {
						listeners: {
							click: clearCompleted
						},
						state: {
							label: 'Clear completed',
							classes: [ 'clear-completed' ]
						}
					}) : null
				];
			}
		]
	}
});

export default createTodoFooter;

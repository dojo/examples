import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';
import createButton from 'dojo-widgets/components/button/createButton';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';

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
		getChildrenNodes: function(this: TodoFooter): (DNode | null)[] {
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
	}
});

export default createTodoFooter;

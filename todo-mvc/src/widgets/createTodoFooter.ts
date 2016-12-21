import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import createButton from 'dojo-widgets/components/button/createButton';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';

export type TodoFooterState = WidgetState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
}

export type TodoFooterProperties = {
	activeFilter: string;
	activeCount: number;
	completedCount: number;
}

export type TodoFooterOptions = WidgetOptions<TodoFooterState, TodoFooterProperties>;

export type TodoFooter = Widget<TodoFooterState, TodoFooterProperties>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		classes: [ 'footer' ],
		getChildrenNodes: function(this: TodoFooter): (DNode | null)[] {
			const { activeCount, activeFilter, completedCount } = this.state;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				v('span', { 'class': 'todo-count' }, [
					v('strong', [activeCount + ' ']),
					v('span', [countLabel + ' left'])
				]),
				w(createTodoFilter, {
					properties: {
						classes: [ 'filters' ],
						activeFilter
					}
				}),
				completedCount ? w(createButton, {
					listeners: {
						click: clearCompleted
					},
					properties: {
						label: 'Clear completed',
						classes: [ 'clear-completed' ]
					}
				}) : null
			];
		}
	}
});

export default createTodoFooter;

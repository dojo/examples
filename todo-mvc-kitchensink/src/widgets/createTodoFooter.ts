import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import createButton from 'dojo-widgets/components/button/createButton';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';
import createViewChooser from './createViewChooser';

interface TodoFooterProperties {
	activeView: string;
	activeFilter: string;
	activeCount: number;
	completedCount: number;
}

export type TodoFooterState = WidgetState & TodoFooterProperties;
export type TodoFooterOptions = WidgetOptions<TodoFooterState, TodoFooterProperties>;
export type TodoFooter = Widget<TodoFooterState, TodoFooterOptions>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		classes: [ 'footer' ],
		getChildrenNodes: function(this: TodoFooter): (DNode | null)[] {
			const { activeCount, activeFilter, completedCount, activeView } = this.state;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				v('span', { 'class': 'todo-count' }, [
					v('strong', [activeCount + ' ']),
					v('span', [countLabel + ' left'])
				]),
				w(createTodoFilter, {
					properties: {
						classes: [ 'filters' ],
						activeFilter,
						activeView
					}
				}),
				w(createViewChooser, {
					properties: {
						activeView,
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

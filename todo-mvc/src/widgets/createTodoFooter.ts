import { Widget, WidgetProperties, DNode } from '@dojo/widget-core/interfaces';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { clearCompleted } from '../actions/userActions';

export interface TodoFooterProperties extends WidgetProperties {
	activeFilter: string;
	activeCount: number;
	completedCount: number;
}

export type TodoFooter = Widget<TodoFooterProperties>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		classes: [ 'footer' ],
		getChildrenNodes: function(this: TodoFooter): (DNode | null)[] {
			const { activeCount, activeFilter, completedCount } = this.properties;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				v('span', { 'class': 'todo-count' }, [
					v('strong', [activeCount + ' ']),
					v('span', [countLabel + ' left'])
				]),
				w('todo-filter', {
					classes: [ 'filters' ],
					activeFilter
				}),
				completedCount ? w('button', {
					onClick: clearCompleted,
					label: 'Clear completed',
					classes: [ 'clear-completed' ]
				}) : null
			];
		}
	}
});

export default createTodoFooter;

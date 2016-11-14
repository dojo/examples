import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { Widget, WidgetOptions, WidgetState, DNode } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
/*import { clearCompleted } from '../actions/userActions';*/
import createTodoFilter from './createTodoFilter';
import createButton from 'dojo-widgets/createButton';

export type TodoFooterState = WidgetState & {
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
};

export type TodoFooterOptions = WidgetOptions<TodoFooterState>;

export type TodoFooter = Widget<TodoFooterState>;

const createTodoFooter = createWidgetBase
	.extend({
		childNodeRenderers: [
			function(this: TodoFooter): DNode[] {
				const activeCount = this.state.activeCount;
				const countLabel = activeCount === 1 ? 'item' : 'items';

				return [
					d('span', {'class': 'todo-count'}, [
						d('strong', [activeCount + ' ']),
						d('span', [countLabel + ' left'])
					]),
					d(createTodoFilter, { classes: [ 'filters' ] }),
					d(createButton, { classes: [ 'clear-completed' ] })
				];
			}
		],

		tagName: 'footer'
	});

export default createTodoFooter;

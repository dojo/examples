import { Widget, DNode, WidgetProperties } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { v, w } from '@dojo/widgets/d';
import createButton from '@dojo/widgets/components/button/createButton';
import { clearCompleted } from '../actions/userActions';
import createTodoFilter from './createTodoFilter';
import createViewChooser from './createViewChooser';

interface TodoFooterProperties {
	activeView: string;
	activeFilter: string;
	activeCount: number;
	completedCount: number;
}

export type TodoFooter = Widget<TodoFooterProperties>;

const createTodoFooter = createWidgetBase.mixin({
	mixin: {
		tagName: 'footer',
		classes: [ 'footer' ],
		getChildrenNodes: function (this: TodoFooter): (DNode | null)[] {
			const { activeCount, activeFilter, completedCount, activeView } = this.properties;
			const countLabel = activeCount === 1 ? 'item' : 'items';

			return [
				v('span', { 'class': 'todo-count' }, [
					v('strong', [ activeCount + ' ' ]),
					v('span', [ countLabel + ' left' ])
				]),
				w(createTodoFilter, {
					classes: [ 'filters' ],
					activeFilter,
					activeView
				}),
				w(createViewChooser, {
					activeView,
					activeFilter
				}),
				completedCount ? w(createButton, <WidgetProperties> {
						label: 'Clear completed',
						classes: [ 'clear-completed' ],
						onClick: clearCompleted.bind(this)
					}) : null
			];
		}
	}
});

export default createTodoFooter;

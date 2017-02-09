import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { clearCompleted } from '../actions/userActions';
import Button from './Button';
import TodoFilter from './TodoFilter';
import ViewChooser from './ViewChooser';

interface TodoFooterProperties {
	activeView?: string;
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
}

export default class TodoFooter extends WidgetBase<TodoFooterProperties> {
	render() {
		const { activeCount = 0, activeFilter = 'all', completedCount = 0, activeView = 'cards' } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return v('footer', {
			classes: {
				footer: true
			}
		}, [
			v('span', { 'class': 'todo-count' }, [
				v('strong', [ activeCount + ' ' ]),
				v('span', [ countLabel + ' left' ])
			]),
			w(TodoFilter, {
				activeFilter,
				activeView
			}),
			w(ViewChooser, {
				activeView,
				activeFilter
			}),
			completedCount ? w(Button, <any> {
					label: 'Clear completed',
					className: 'clear-completed',
					onClick: clearCompleted.bind(this)
				}) : null
		]);
	}
}

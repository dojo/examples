import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { clearCompleted } from '../actions/userActions';
import Button from './Button';
import * as styles from './styles/TodoFooter.css';
import TodoFilter from './TodoFilter';
import ViewChooser from './ViewChooser';

interface TodoFooterProperties {
	activeView?: string;
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
}

@theme(styles)
export default class TodoFooter extends ThemeableMixin(WidgetBase)<TodoFooterProperties> {
	render() {
		const { activeCount = 0, activeFilter = 'all', completedCount = 0, activeView = 'cards' } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return v('footer', {
			classes: this.classes(styles.footer).get()
		}, [
			v('span', {
				classes: this.classes(styles.todoCount).get()
			}, [
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
				overrideClasses: {
					button: styles.clearCompleted
				},
				onClick: clearCompleted.bind(this)
			}) : null
		]);
	}
}

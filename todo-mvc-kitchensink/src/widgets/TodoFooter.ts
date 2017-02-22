import { v, w } from '@dojo/widget-core/d';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { clearCompleted } from '../actions/userActions';
import appBundle from '../nls/common';
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
export default class TodoFooter extends I18nMixin(ThemeableMixin(WidgetBase))<TodoFooterProperties> {
	render() {
		const { activeCount = 0, activeFilter = 'all', completedCount = 0, activeView = 'cards' } = this.properties;

		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.classes(styles.footer).get()
		}, [
			v('span', {
				classes: this.classes(styles.todoCount).get(),
				innerHTML: `${activeCount} item${activeCount === 1 ? '' : 's'} left`
			}),
			w(TodoFilter, {
				activeFilter,
				activeView
			}),
			w(ViewChooser, {
				activeView,
				activeFilter
			}),
			completedCount ? w(Button, <any> {
				label: messages.clearButtonText,
				overrideClasses: {
					button: styles.clearCompleted
				},
				onClick: clearCompleted.bind(this)
			}) : null
		]);
	}
}

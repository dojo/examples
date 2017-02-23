import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import Button from './Button';
import * as styles from './styles/TodoFooter.css';
import TodoFilter from './TodoFilter';
import ViewChooser from './ViewChooser';

interface TodoFooterProperties extends ThemeableProperties, I18nProperties {
	activeView?: string;
	activeFilter?: string;
	activeCount?: number;
	completedCount?: number;
	clearCompleted: Function;
}

@theme(styles)
export default class TodoFooter extends I18nMixin(ThemeableMixin(WidgetBase))<TodoFooterProperties> {
	render() {
		const { activeCount = 0, activeFilter = 'all', completedCount = 0, activeView = 'cards' } = this.properties;

		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.classes(styles.footer)
		}, [
			v('span', {
				classes: this.classes(styles.todoCount),
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
				onClick: this._clearCompleted()
			}) : null
		]);
	}

	private _clearCompleted() {
		this.properties.clearCompleted();
	}
}

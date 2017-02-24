import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import * as styles from './styles/TodoFooter.css';

interface TodoFooterProperties extends ThemeableProperties, I18nProperties {
	activeView: string;
	activeFilter: string;
	activeCount: number;
	completedCount: number;
	clearCompleted: Function;
}

@theme(styles)
export default class TodoFooter extends I18nMixin(ThemeableMixin(WidgetBase))<TodoFooterProperties> {
	render() {
		const { activeCount, activeFilter, completedCount, activeView } = this.properties;

		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.classes(styles.footer)
		}, [
			v('span', {
				classes: this.classes(styles.todoCount),
				innerHTML: `${activeCount} item${activeCount === 1 ? '' : 's'} left`
			}),
			w('filters', {
				activeFilter,
				activeView
			}),
			w('view-chooser', {
				activeView,
				activeFilter
			}),
			completedCount ? w('button', <any> {
				label: messages.clearButtonText,
				overrideClasses: {
					button: styles.clearCompleted
				},
				onClick: this._clearCompleted
			}) : null
		]);
	}

	private _clearCompleted() {
		this.properties.clearCompleted();
	}
}

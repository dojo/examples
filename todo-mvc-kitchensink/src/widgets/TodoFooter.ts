import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import * as styles from './styles/TodoFooter.m.css';
import TodoFilter from './TodoFilter';
import ViewChooser from './ViewChooser';
import Button from './Button';

interface TodoFooterProperties extends ThemeableProperties, I18nProperties {
	activeView?: 'list' | 'cards';
	activeFilter?: 'all' | 'active' | 'completed';
	activeCount?: number;
	completedCount?: number;
	clearCompleted?: Function;
}

@theme(styles)
export default class TodoFooter extends I18nMixin(ThemeableMixin(WidgetBase))<TodoFooterProperties> {
	render() {
		const { activeCount, activeFilter = 'all', completedCount, activeView = 'list' } = this.properties;

		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.classes(styles.footer)
		}, [
			v('span', {
				classes: this.classes(styles.todoCount),
				innerHTML: `${activeCount} item${activeCount === 1 ? '' : 's'} left`
			}),
			w<TodoFilter>('filters', {
				activeFilter,
				activeView
			}),
			w<ViewChooser>('view-chooser', {
				activeView,
				activeFilter
			}),
			completedCount ? w<Button>('button', {
				label: messages.clearButtonText,
				extraClasses: {
					button: styles.clearCompleted
				},
				onClick: this._clearCompleted
			}) : null
		]);
	}

	private _clearCompleted() {
		this.properties.clearCompleted && this.properties.clearCompleted();
	}
}

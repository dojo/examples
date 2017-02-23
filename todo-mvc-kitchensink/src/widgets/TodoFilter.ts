import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import router, { mainRoute } from '../routes';
import * as styles from './styles/TodoFilter.css';

interface TodoFilterProperties {
	activeFilter: string;
	activeView: string;

}

function createFilterItems(instance: TodoFilter, activeFilter: string, activeView: string, messages: typeof appBundle.messages): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	const labels: { [key: string]: string } = {
		'all': messages.filterAll,
		'active': messages.filterActive,
		'completed': messages.filterCompleted
	};

	return filters.map((filterItem) => {
		const label = labels[ filterItem ];
		const classes = [];

		if (activeFilter === filterItem) {
			classes.push(styles.selected);
		}

		return v('li', [
			v('a', {
				innerHTML: label,
				href: router.link(mainRoute, {
					filter: filterItem,
					view: activeView
				}),
				classes: instance.classes(...classes)
			})
		]);
	});
}

@theme(styles)
export default class TodoFilter extends I18nMixin(ThemeableMixin(WidgetBase))<TodoFilterProperties> {
	render() {
		const { activeFilter = '', activeView = '' } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return v('ul', {
			classes: this.classes(styles.filters)
		}, createFilterItems(this, activeFilter, activeView, messages));
	}
}

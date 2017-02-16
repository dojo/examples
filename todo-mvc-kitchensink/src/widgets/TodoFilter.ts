import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import router, { mainRoute } from '../routes';
import * as styles from './styles/TodoFilter.css';

interface TodoFilterProperties {
	activeFilter: string;
	activeView: string;

}

function createFilterItems(instance: TodoFilter, activeFilter: string, activeView: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[ 0 ].toUpperCase() + filterItem.substring(1);
		const classes = [];

		if (activeFilter === filterItem) {
			classes.push(styles.selected);
		}

		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: router.link(mainRoute, {
					filter: filterItem,
					view: activeView
				}),
				classes: instance.classes(...classes).get()
			})
		]);
	});
}

@theme(styles)
export default class TodoFilter extends ThemeableMixin(WidgetBase)<TodoFilterProperties> {
	render() {
		const { activeFilter = '', activeView = '' } = this.properties;

		return v('ul', {
			classes: this.classes(styles.filters).get()
		}, createFilterItems(this, activeFilter, activeView));
	}
}

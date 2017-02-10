import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode } from '@dojo/widget-core/interfaces';
import router, { mainRoute } from '../routes';

interface TodoFilterProperties {
	activeFilter: string;
	activeView: string;

}

function createFilterItems(activeFilter: string, activeView: string): DNode[] {
	const filters = [ 'all', 'active', 'completed' ];
	return filters.map((filterItem) => {
		const label = filterItem[ 0 ].toUpperCase() + filterItem.substring(1);
		return v('li', {}, [
			v('a', {
				innerHTML: label,
				href: router.link(mainRoute, {
					filter: filterItem,
					view: activeView
				}),
				classes: {
					selected: activeFilter === filterItem
				}
			})
		]);
	});
}

export default class TodoFilter extends WidgetBase<TodoFilterProperties> {
	render() {
		const { activeFilter = '', activeView = '' } = this.properties;

		return v('ul', {
			classes: {
				filters: true
			}
		}, createFilterItems(activeFilter, activeView));
	}
}

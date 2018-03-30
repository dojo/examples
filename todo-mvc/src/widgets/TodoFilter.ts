import WidgetBase from '@dojo/widget-core/WidgetBase';
import { Outlet } from '@dojo/routing/Outlet';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoFilter.m.css';

export interface TodoFilterProperties {
	activeFilter: 'all' | 'active' | 'completed';
}

function mapFilterRouteParam({ params }: any) {
	return { activeFilter: params.filter };
}

@theme(css)
export default class TodoFilter extends ThemedMixin(WidgetBase)<TodoFilterProperties> {

	protected render() {
		const { activeFilter } = this.properties;

		return v('ul', { classes: this.theme(css.filters) }, [
			v('li', [
				v('a', {
					href: '#filter/all',
					classes: this.theme([activeFilter === 'all' ? css.selected : null])
				}, [ 'all' ]),
				v('a', {
					href: '#filter/active',
					classes: this.theme([activeFilter === 'active' ? css.selected : null])
				}, [ 'active' ]),
				v('a', {
					href: '#filter/completed',
					classes: this.theme([activeFilter === 'completed' ? css.selected : null])
				}, [ 'completed' ])
			])
		]);
	}
}

export const TodoFilterOutlet = Outlet(TodoFilter, 'filter', { mapParams: mapFilterRouteParam });

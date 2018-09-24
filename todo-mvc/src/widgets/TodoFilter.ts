import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v } from '@dojo/framework/widget-core/d';

import * as css from './styles/todoFilter.m.css';

export interface TodoFilterProperties {
	activeFilter: string;
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

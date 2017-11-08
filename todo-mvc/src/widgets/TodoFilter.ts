import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoFilter.css';

export interface TodoFilterProperties extends WidgetProperties {
	activeFilter: 'all' | 'active' | 'completed';
}

export const TodoFilterBase = ThemedMixin(WidgetBase);

@theme(css)
export default class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	render() {
		const { activeFilter } = this.properties;

		return v('ul', { classes: this.theme(css.filters) }, [
			v('li', [
				v('a', { href: '#all', innerHTML: 'all', classes: this.theme([activeFilter === 'all' ? css.selected : null]) }),
				v('a', { href: '#active', innerHTML: 'active', classes: this.theme([activeFilter === 'active' ? css.selected : null]) }),
				v('a', { href: '#completed', innerHTML: 'completed', classes: this.theme([activeFilter === 'completed' ? css.selected : null]) })
			])
		]);
	}
}

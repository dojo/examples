import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';

import * as css from './styles/todoFilter.m.css';

export interface TodoFilterProperties extends WidgetProperties {
	filter?: string;
}

export const TodoFilterBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	render() {
		const { filter } = this.properties;

		return v('ul', { classes: this.classes(css.filters) }, [
			v('li', [
				w(Link, {
					key: 'all',
					classes: this.classes(filter === 'all' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'all' }
				}, [ 'all' ]),
				w(Link, {
					key: 'active',
					classes: this.classes(filter === 'active' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'active' }
				}, [ 'active' ]),
				w(Link, {
					key: 'completed',
					classes: this.classes(filter === 'completed' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'completed' }
				}, [ 'completed' ])
			])
		]);
	}
}

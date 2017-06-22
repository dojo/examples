import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoFilter.m.css';

export interface TodoFilterProperties extends WidgetProperties {
	filter?: string;
}

export const TodoFilterBase = I18nMixin(ThemeableMixin(WidgetBase));

@theme(css)
export class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	render() {
		const { filter } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return v('ul', { classes: this.classes(css.filters) }, [
			v('li', [
				w(Link, {
					key: 'all',
					classes: this.classes(filter === 'all' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'all' }
				}, [ messages.filterAll ]),
				w(Link, {
					key: 'active',
					classes: this.classes(filter === 'active' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'active' }
				}, [ messages.filterActive ]),
				w(Link, {
					key: 'completed',
					classes: this.classes(filter === 'completed' ? css.selected : null),
					to: 'view',
					isOutlet: true,
					params: { filter: 'completed' }
				}, [ messages.filterCompleted ])
			])
		]);
	}
}

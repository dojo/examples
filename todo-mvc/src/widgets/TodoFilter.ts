import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import * as css from './styles/todoFilter.css';

export interface TodoFilterProperties extends WidgetProperties {
	activeFilter: 'all' | 'active' | 'completed';
}

export const TodoFilterBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	render() {
		const { activeFilter } = this.properties;

		return v('ul', { classes: this.classes(css.filters) }, [
			v('li', [
				v('a', { href: '#all', innerHTML: 'all', classes: this.classes(activeFilter === 'all' ? css.selected : null) }),
				v('a', { href: '#active', innerHTML: 'active', classes: this.classes(activeFilter === 'active' ? css.selected : null) }),
				v('a', { href: '#completed', innerHTML: 'completed', classes: this.classes(activeFilter === 'completed' ? css.selected : null) })
			])
		]);
	}
}

import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';

import * as css from './styles/todoFilter.css';

export interface TodoFilterProperties extends WidgetProperties {
	filter?: string;
}

export const TodoFilterBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	protected render(): DNode {
		const links = ['all', 'active', 'completed'].map(this._createLink.bind(this));

		return v('ul', { classes: this.classes(css.filters) }, [ v('li', links) ]);
	}

	private _createLink(filter: string) {
		const { filter: currentFilter } = this.properties;
		const classes = this.classes(filter === currentFilter ? css.selected : null);

		return w(Link, { key: filter, to: 'filter', params: { filter },  classes }, [ filter ]);
	}
}

export default TodoFilter;

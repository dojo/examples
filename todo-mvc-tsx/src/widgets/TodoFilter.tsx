import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { Link } from '@dojo/routing/Link';
import { tsx } from '@dojo/widget-core/tsx';

import * as css from './styles/todoFilter.m.css';

export interface TodoFilterProperties extends WidgetProperties {
	filter?: string;
}

export const TodoFilterBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoFilter extends TodoFilterBase<TodoFilterProperties> {

	protected render(): DNode {
		const links = ['all', 'active', 'completed'].map(this._createLink.bind(this));

		return (
			<ul classes={this.theme(css.filters)}>
				<li>
					{links}
				</li>
			</ul>
		);
	}

	private _createLink(filter: string) {
		const { filter: currentFilter } = this.properties;
		const classes = this.theme(filter === currentFilter ? css.selected : null);

		return (
			<Link key={filter} to='filter' params={{ filter }} classes={classes}>
				{filter}
			</Link>
		);
	}
}

export default TodoFilter;

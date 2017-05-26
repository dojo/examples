import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { tsx, fromRegistry } from '@dojo/widget-core/tsx';
import { TodoFilterProperties } from './TodoFilter';

import * as css from './styles/todoFooter.css';

export interface TodoFooterProperties extends WidgetProperties {
	activeCount: number;
	clearCompleted: Function;
	activeFilter: 'all' | 'active' | 'completed';
	completedItems: boolean;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoFooter extends TodoHeaderBase<TodoFooterProperties> {

	clearCompleted() {
		this.properties.clearCompleted();
	}

	render() {
		const { activeFilter, activeCount, completedItems } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';
		const TodoFilter = fromRegistry<TodoFilterProperties>('todo-filter');

		return (
			<footer classes={this.classes(css.footer)}>
				<span classes={this.classes(css.todoCount)}>
					<strong>{`${activeCount} `}</strong>
					<span>{`${countLabel} left`}</span>
				</span>
				<TodoFilter activeFilter={activeFilter} />
				{ completedItems ? (
					<button onclick={this.clearCompleted} innerHTML='Clear completed' classes={this.classes(css.clearCompleted)} />
				) : (null) }
			</footer>
		);
	}
}

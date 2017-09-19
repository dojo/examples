import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { tsx } from '@dojo/widget-core/tsx';

import { TodoFilter } from './TodoFilter';
import * as css from './styles/todoFooter.css';

export interface TodoFooterProperties extends WidgetProperties {
	activeCount: number;
	filter: string;
	todoCount: number;
	clearCompleted: () => void;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoFooter extends TodoHeaderBase<TodoFooterProperties> {

	clearCompleted() {
		this.properties.clearCompleted();
	}

	protected render(): DNode {
		const { filter, activeCount, todoCount } = this.properties;
		const completedItems = (todoCount - activeCount) > 0;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return (
			<footer classes={this.classes(css.footer)}>
				<span classes={this.classes(css.todoCount)}>
					<strong>{`${activeCount} `}</strong>
					<span>{`${countLabel} left`}</span>
				</span>
				<TodoFilter filter={filter} />
				{ completedItems ? (
					<button onclick={this.clearCompleted} classes={this.classes(css.clearCompleted)}>
						Clear completed
					</button>
				) : (null) }
			</footer>
		);
	}
}

export default TodoFooter;

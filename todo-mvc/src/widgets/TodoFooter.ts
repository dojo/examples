import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v, w } from '@dojo/widget-core/d';

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

	private _clearCompleted() {
		this.properties.clearCompleted();
	}

	protected render(): DNode {
		const { filter, activeCount, todoCount } = this.properties;
		const completedItems = (todoCount - activeCount) > 0;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return v('footer', { classes: this.classes(css.footer) }, [
			v('span', { classes: this.classes(css.todoCount) }, [
				v('strong', [ `${activeCount} ` ]),
				v('span', [ `${countLabel} left`])
			]),
			w<TodoFilter>('todo-filter', { filter }),
			completedItems ? v('button', { onclick: this._clearCompleted, classes: this.classes(css.clearCompleted) }, [
				'Clear Completed'
			] ) : null
		]);
	}
}

export default TodoFooter;

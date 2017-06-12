import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';

import { TodoViewSwitch } from './TodoViewSwitch';
import { TodoFilter } from './TodoFilter';

import * as css from './styles/todoFooter.m.css';

export interface TodoFooterInterface {
	view: string;
	filter: string;
	activeCount: number;
	todoCount: number;
	clearCompleted: () => void;
}

export const TodoFooterBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoFooter extends TodoFooterBase<TodoFooterInterface> {

	protected clearCompleted() {
		this.properties.clearCompleted();
	}

	protected render(): DNode {
		const { filter, view, activeCount, todoCount } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';
		const completedItems = (todoCount - activeCount) > 0;

		return v('footer', {
			classes: this.classes(css.footer)
		}, [
			v('span', { classes: this.classes(css.todoCount) }, [
				v('strong', [activeCount + ' ']),
				v('span', [countLabel + ' left'])
			]),
			w(TodoFilter, { filter }),
			w(TodoViewSwitch, { view }),
			completedItems ? v('button', {
				onclick: this.clearCompleted,
				innerHTML: 'Clear completed',
				classes: this.classes(css.clearCompleted)
			}) : null
		]);
	}
}

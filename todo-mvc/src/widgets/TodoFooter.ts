import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { v, w } from '@dojo/widget-core/d';

import * as css from './styles/todoFooter.css';

export interface TodoFooterProperties extends WidgetProperties {
	activeCount: number;
	clearCompleted: Function;
	completedItems: boolean;
}

export const TodoHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class TodoFooter extends TodoHeaderBase<TodoFooterProperties> {

	clearCompleted() {
		this.properties.clearCompleted();
	}

	render() {
		const { activeCount, completedItems } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return v('footer', { classes: this.classes(css.footer) }, [
			v('span', { classes: this.classes(css.todoCount) }, [
				v('strong', [activeCount + ' ']),
				v('span', [countLabel + ' left'])
			]),
			w('todo-filter', { }),
			completedItems ? v('button', {
				onclick: this.clearCompleted,
				innerHTML: 'Clear completed',
				classes: this.classes(css.clearCompleted)
			}) : null
		]);
	}
}

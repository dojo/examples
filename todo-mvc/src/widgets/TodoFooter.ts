import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { v, w } from '@dojo/framework/widget-core/d';
import { TodoFilterOutlet } from './TodoFilter';

import * as css from './styles/todoFooter.m.css';

export interface TodoFooterProperties {
	activeCount: number;
	clearCompleted: Function;
	completedItems: boolean;
}

@theme(css)
export default class TodoFooter extends ThemedMixin(WidgetBase)<TodoFooterProperties> {

	clearCompleted() {
		this.properties.clearCompleted();
	}

	protected render() {
		const { activeCount, completedItems } = this.properties;
		const countLabel = activeCount === 1 ? 'item' : 'items';

		return v('footer', { classes: this.theme(css.footer) }, [
			v('span', { classes: this.theme(css.todoCount) }, [
				v('strong', [activeCount + ' ']),
				v('span', [countLabel + ' left'])
			]),
			w(TodoFilterOutlet, {}),
			completedItems ? v('button', {
				onclick: this.clearCompleted,
				innerHTML: 'Clear completed',
				classes: this.theme(css.clearCompleted)
			}) : null
		]);
	}
}

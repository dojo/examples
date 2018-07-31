import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';

import TodoViewSwitch from './TodoViewSwitch';
import TodoFilter from './TodoFilter';
import appBundle from '../nls/common';
import * as css from './styles/todoFooter.m.css';

export interface TodoFooterInterface {
	activeCount: number;
	filter: string;
	todoCount: number;
	view: string;
	clearCompleted: (payload: object) => void;
}

@theme(css)
export default class TodoFooter extends I18nMixin(ThemedMixin(WidgetBase))<TodoFooterInterface> {

	protected clearCompleted(): void {
		this.properties.clearCompleted({});
	}

	protected render() {
		const { filter, view, activeCount, todoCount } = this.properties;
		const completedItems = (todoCount - activeCount) > 0;
		const { messages, format } = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.theme(css.footer)
		}, [
			v('span', { classes: this.theme(css.todoCount) }, [
				v('strong', [activeCount + ' ']),
				v('span', [ format('itemsLeft', { count: activeCount }) ])
			]),
			w(TodoFilter, { filter }),
			w(TodoViewSwitch, { view }),
			completedItems ? v('button', {
				onclick: this.clearCompleted,
				classes: this.theme(css.clearCompleted)
			}, [ messages.clearButtonText ]) : null
		]);
	}
}

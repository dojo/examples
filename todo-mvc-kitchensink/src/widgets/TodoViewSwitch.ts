import { v, w } from '@dojo/widget-core/d';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Link } from '@dojo/routing/Link';

import * as css from './styles/todoViewSwitch.m.css';

export interface TodoViewSwitchProperties {
	view: string;
}

export const TodoViewSwitchBase = ThemedMixin(WidgetBase);

@theme(css)
export class TodoViewSwitch extends TodoViewSwitchBase<TodoViewSwitchProperties> {
	render() {
		const { view } = this.properties;

		return v('ul', {
			classes: this.theme(css.viewChooser)
		}, [
			v('li', [
				w(Link, {
					key: 'list',
					to: 'view',
					isOutlet: true,
					params: { view: 'list' },
					classes: this.theme([ css.list, view === 'list' ? css.active : null ])
				})
			]),
			v('li', [
				w(Link, {
					key: 'card',
					to: 'view',
					isOutlet: true,
					params: { view: 'card' },
					classes: this.theme([ css.cards, view === 'card' ? css.active : null ])
				})
			])
		]);
	}
}

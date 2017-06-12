import { v, w } from '@dojo/widget-core/d';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Link } from '@dojo/routing/Link';

import * as css from './styles/todoViewSwitch.m.css';

export interface TodoViewSwitchProperties {
	view: string;
}

export const TodoViewSwitchBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoViewSwitch extends TodoViewSwitchBase<TodoViewSwitchProperties> {
	render() {
		const { view } = this.properties;

		return v('ul', {
			classes: this.classes(css.viewChooser)
		}, [
			v('li', [
				w(Link, {
					key: 'list',
					to: 'view',
					isOutlet: true,
					params: { view: 'list' },
					classes: this.classes(css.list, view === 'list' ? css.active : null)
				})
			]),
			v('li', [
				w(Link, {
					key: 'card',
					to: 'view',
					isOutlet: true,
					params: { view: 'card' },
					classes: this.classes(css.cards, view === 'card' ? css.active : null)
				})
			])
		]);
	}
}

import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import * as css from './styles/menuItem.m.css';

export interface MenuItemProperties {
	selected: boolean;
	category: string;
}

export class MenuItem extends WidgetBase<MenuItemProperties> {
	render() {
		const { selected, category } = this.properties;

		return v('li', { classes: css.root }, [
			v(
				'a',
				{
					href: `#/${category}/1`,
					classes: [css.item, selected ? css.selected : null]
				},
				this.children
			)
		]);
	}
}

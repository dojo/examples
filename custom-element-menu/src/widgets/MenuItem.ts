import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { v } from '@dojo/framework/core/vdom';
import { customElement } from '@dojo/framework/core/decorators/customElement';
import { theme, ThemedMixin } from '@dojo/framework/core/mixins/Themed';

import * as css from './styles/menuItem.m.css';

export interface MenuItemProperties {
	selected?: boolean;
	data?: any;
	title?: string;
	onSelected?: (data: any) => void;
}

@customElement<MenuItemProperties>({
	tag: 'demo-menu-item',
	events: ['onSelected'],
	attributes: ['title'],
	properties: ['data', 'selected']
})
@theme(css)
export class MenuItem extends ThemedMixin(WidgetBase)<MenuItemProperties> {
	private _onClick() {
		this.properties.onSelected && this.properties.onSelected(this.properties.data);
	}

	protected render() {
		const { selected } = this.properties;

		return v('li', { classes: this.theme(css.root) }, [
			v(
				'span',
				{
					classes: this.theme([css.item, selected ? css.selected : null]),
					onclick: this._onClick
				},
				[this.properties.title]
			)
		]);
	}
}

export default MenuItem;

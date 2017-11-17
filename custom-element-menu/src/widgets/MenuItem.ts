import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';

import * as css from './styles/menuItem.m.css';

export interface MenuItemProperties {
	title: string;
	selected?: boolean;
	data?: any;
	onSelected?: (data: any) => void;
}

@theme(css)
export class MenuItem extends ThemedMixin(WidgetBase)<MenuItemProperties> {

	private _onClick() {
		this.properties.onSelected && this.properties.onSelected(this.properties.data);
	}

	protected render() {
		const { title, selected } = this.properties;

		return v('li', { classes: this.theme(css.root) }, [
			v('span', {
				classes: this.theme([ css.item, selected ? css.selected : null ]),
				onclick: this._onClick
			}, [ title ])
		]);
	};
}

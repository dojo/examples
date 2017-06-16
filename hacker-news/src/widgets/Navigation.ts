import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/Navigation.m.css';

export interface NavigationProperties extends WidgetProperties {
	type: string;
	page: number;
	total: number;
}

export const NavigationBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class Navigation extends NavigationBase<NavigationProperties> {
	private _linkProperties(prev: boolean) {
		if (this.properties.page && (prev ? (this.properties.page > 1) : (this.properties.page < this.properties.total))) {
			return {
				href: `/#${this.properties.type}/${this.properties.page + (prev ? -1 : 1)}`,
				classes: this.classes()
			};
		}
		else {
			return { classes: this.classes(css.disabled) };
		}
	}

	protected render(): DNode {
		const classes = this.classes(
			css.navigation,
		);

		return v('div', { classes }, [
			v('a', this._linkProperties(true), [ '< prev' ]),
			v('span', {}, [ `${this.properties.page}/${this.properties.total}` ]),
			v('a', this._linkProperties(false), [ 'next >' ])
		]);
	}
}


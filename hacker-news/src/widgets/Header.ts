import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/Header.m.css';

export const HeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class Header extends HeaderBase<WidgetProperties> {
	protected render(): DNode {
		const classes = this.classes(
			css.header,
		);
		const linkClasses = this.classes(
			css.link
		);
		function navigation(page: string) {
			return v('a', { href: `/#${page.toLowerCase()}`, classes: linkClasses }, [ page ]);
		}

		return v('header', { classes }, [ v('nav', {}, [ 'Top', 'New', 'Show', 'Ask', 'Jobs' ].map(navigation)) ]);
	}
}

import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { story_type } from "../stories";

import * as css from './styles/Header.m.css';

interface HeaderProperties extends WidgetProperties {
	type: story_type;
}

export const HeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class Header extends HeaderBase<HeaderProperties> {
	protected render(): DNode {
		const classes = this.classes(css.header);
		const linkClasses = this.classes(css.link);
		const activeLinkClasses = this.classes(css.activeLink);
		const type = this.properties.type;

		function navigation(page: string) {
			const classes = page.toLowerCase() === type ? activeLinkClasses : linkClasses;
			return v('a', { href: `/#${page.toLowerCase()}`, classes }, [ page ] );
		}

		return v('header', { classes }, [
			v('img', { classes: this.classes(css.logo), src: 'images/dojo2-logo-white.svg' }),
			v('nav', { classes: this.classes(css.nav) }, [ 'Top', 'New', 'Show', 'Ask', 'Jobs' ].map(navigation))
		]);
	}
}

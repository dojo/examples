import { Link } from '@dojo/routing/Link';
import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme, ClassesFunctionChain } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/hackerNewsHeader.m.css';
import { story_type } from "../interfaces";

export interface HackerNewsHeaderProperties extends WidgetProperties {
	view?: story_type;
}

export const HackerNewsHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class HackerNewsHeader extends HackerNewsHeaderBase<HackerNewsHeaderProperties> {
	protected _navigation(to: story_type, linkClasses: ClassesFunctionChain, activeLinkClasses: ClassesFunctionChain) {
		const classes = to === this.properties.view ? activeLinkClasses : linkClasses;
		return w(Link, {
			classes,
			key: to,
			to: 'stories',
			params: { view: to, page: '1' },
			isOutlet: true
		}, [ `${to[0].toUpperCase()}${to.slice(1)}` ] );
	}
	protected render(): DNode {
		const classes = this.classes(css.header);
		const linkClasses = this.classes(css.link);
		const activeLinkClasses = this.classes(css.activeLink);

		return v('header', { classes }, [
			v('img', { classes: this.classes(css.logo), src: 'images/dojo2-logo-white.svg' }),
			v('nav', { classes: this.classes(css.nav) }, [ 'top', 'new', 'show', 'ask', 'jobs' ].map((view: story_type) =>
				this._navigation(view, linkClasses, activeLinkClasses)
			))
		]);
	}
}

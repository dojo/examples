import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme, ClassesFunctionChain } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/hackerNewsNavigation.m.css';
import { story_type } from "../interfaces";

export interface HackerNewsNavigationProperties extends WidgetProperties {
	view: story_type;
	page: number;
	pages: number;
	pageSize: number;
}

export const HackerNewsNavigationBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class HackerNewsNavigation extends HackerNewsNavigationBase<HackerNewsNavigationProperties> {
	private _createLink(prev: boolean, page: number) {
		const text = prev ? '< prev' : 'next >';
		const newPage = prev ? Math.max(1, page - 1) : Math.min(page + 1, this.properties.pages);
		if (page && (prev ? (page > 1) : (page < this.properties.pages))) {
			return w(Link, {
				key: text,
				classes: this.classes(css.link),
				to: 'stories',
				params: { view: this.properties.view, page: String(newPage) },
				isOutlet: true
			}, [ text ]);
		}
		else {
			return v('a', {
				key: text,
				href: 'javascript:void(0)',
				disabled: true,
				'aria-disabled': true,
				classes: this.classes(css.disabled)
			}, [ text ]);
		}
	}

	protected render(): DNode {
		const page = Math.min(this.properties.page, this.properties.pages);

		if (!this.properties.pages || this.properties.pages === 1) {
			return v('div', { classes: this.classes(css.emptyNavigation) });
		}

		return v('div', { classes: this.classes(css.navigation) }, [
			this._createLink(true, page),
			v('span', { classes: this.classes(css.pageNumber) }, [ `${page}/${this.properties.pages}` ]),
			this._createLink(false, page),
		]);
	}
}


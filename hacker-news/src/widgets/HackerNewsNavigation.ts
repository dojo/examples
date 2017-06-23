import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/hackerNewsNavigation.m.css';
import { story_type } from "../hackerNewsStoriesService";

export interface HackerNewsNavigationProperties extends WidgetProperties {
	showStories(view: story_type, page: number, pageSize: number): void;
	view: story_type;
	page: number;
	pages: number;
	pageSize: number;
}

export const HackerNewsNavigationBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class HackerNewsNavigation extends HackerNewsNavigationBase<HackerNewsNavigationProperties> {
	protected _navigate(page: number) {
		this.properties.showStories(this.properties.view, page, this.properties.pageSize)
	}

	protected _onClickNext() {
		const page = this.properties.page + 1;
		this._navigate(page);
	}

	protected _onClickPrevious() {
		const page = this.properties.page - 1;
		this._navigate(page);
	}

	protected render(): DNode {
		const classes = this.classes(
			css.navigation,
		);

		const page = Math.min(this.properties.page, this.properties.pages);

		if (!this.properties.pages || this.properties.pages === 1) {
			return null;
		}

		return v('div', { classes }, [
			v('span', { classes: this.classes(css.link), onclick: this._onClickPrevious }, [ '< prev' ]),
			v('span', { classes: this.classes(css.pageNumber) }, [ `${page}/${this.properties.pages}` ]),
			v('span', { classes: this.classes(css.link), onclick: this._onClickNext }, [ 'next >' ])
		]);
	}
}


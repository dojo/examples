import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { story_type } from '../hackerNewsStoriesService';

import * as css from './styles/hackerNewsHeader.m.css';

interface HeaderProperties extends WidgetProperties {
	showStories(view: story_type, page: number, pageSize: number): void;
	view?: story_type;
	pageSize: number;
}

export const HackerNewsHeaderBase = ThemeableMixin(WidgetBase);

@theme(css)
export default class HackerNewsHeader extends HackerNewsHeaderBase<HeaderProperties> {
	protected _navigate(view: story_type) {
		this.properties.showStories(view, 1, this.properties.pageSize)
	}

	protected _onClickTop() {
		this._navigate('top');
	}

	protected _onClickNew() {
		this._navigate('new');
	}

	protected _onClickBest() {
		this._navigate('best');
	}

	protected _onClickShow() {
		this._navigate('show');
	}

	protected _onClickAsk() {
		this._navigate('ask');
	}

	protected _onClickJobs() {
		this._navigate('jobs');
	}

	protected render(): DNode {
		const classes = this.classes(css.header);
		const linkClasses = this.classes(css.link);
		const activeLinkClasses = this.classes(css.activeLink);
		const view = this.properties.view;

		function navigation(page: story_type, onClick: (...args: any[]) => void) {
			const classes = page === view ? activeLinkClasses : linkClasses;
			return v('span', { onclick: onClick, classes }, [ `${page[0].toUpperCase()}${page.slice(1)}` ] );
		}

		return v('header', { classes }, [
			v('img', { classes: this.classes(css.logo), src: 'images/dojo2-logo-white.svg' }),
			v('nav', { classes: this.classes(css.nav) }, [
				navigation('top', this._onClickTop),
				navigation('best', this._onClickBest),
				navigation('new', this._onClickNew),
				navigation('show', this._onClickShow),
				navigation('jobs', this._onClickJobs),
				navigation('ask', this._onClickAsk)
			])
		]);
	}
}

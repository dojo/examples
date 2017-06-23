import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Story from './HackerNewsStory';

import * as css from './styles/hackerNewsStoryPage.m.css';
import Header from "./HackerNewsHeader";
import { story_type } from "../hackerNewsStoriesService";
import HackerNewsNavigation from './HackerNewsNavigation';
import { Item } from "../HackerNewsAppContext";

export const HackerNewsStoryPageBase = ThemeableMixin(WidgetBase);

export interface HackerNewsStoryPageProperties extends WidgetProperties {
	stories: Item[];
	pageSize: number;
	page: number;
	pages: number;
	view: story_type;
}

@theme(css)
export default class HackerNewsStoryPage extends HackerNewsStoryPageBase<HackerNewsStoryPageProperties> {
	protected render(): DNode {
		const { page, pages, view, pageSize } = this.properties;

		return v('div', { classes: this.classes(css.storyPage)}, [
			w<Header>(Header, { view, pageSize }),
			w<HackerNewsNavigation>(HackerNewsNavigation, { page, pages, view, pageSize }),
			v(
				'ol',
				{ start: 1 + (this.properties.pageSize * (page - 1)), classes: this.classes(css.list) },
				this.properties.stories.map((story) => w<Story>(Story, { ...story, key: String(story.order) }))
			)
		]);
	}
}

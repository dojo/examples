import { w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import HackerNewsStoryPageOutlet from '../outlets/HackerNewsStoryPageOutlet';
import { Item } from "../HackerNewsAppContext";
import { story_type } from "../hackerNewsStoriesService";

export interface HackerNewsAppProperties extends WidgetProperties {
	showStories(view: story_type, page: number, pageSize: number): void;
	pages: number;
	pageSize: number;
	stories: Item[];
}


export default class HackerNewsApp extends WidgetBase<HackerNewsAppProperties> {

	protected render(): DNode {
		const { pages, pageSize, stories = [], showStories } = this.properties;

		return w(HackerNewsStoryPageOutlet, { pages, stories, pageSize, showStories });
	}
}

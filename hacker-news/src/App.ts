import { w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import StoryPage from "./widgets/StoryPage";
import { story_type } from "./stories";

interface AppProperties extends WidgetProperties {
	type: story_type;
	page: number;
	pages: number;
	stories: Item[];
}

export interface Item {
	// Hacker News data
	id: string;
	deleted?: boolean;
	type?: string;
	by?: string;
	time?: number;
	text?: string;
	dead?: boolean;
	parent?: string;
	poll?: string;
	kids?: string[];
	url?: string;
	score?: number;
	title?: string;
	parts?: string[];
	descendants?: number;

	// Local data
	localId: string;
	order: number;
	list: story_type;
	updated: number;
}

export const PAGE_SIZE = 30;

export default class App extends WidgetBase<AppProperties> {

	protected render(): DNode {
		const { type, page, pages, stories = [] } = this.properties;

		return w<StoryPage>(StoryPage, { type, page, pages, stories, pageSize: PAGE_SIZE });
	}
}

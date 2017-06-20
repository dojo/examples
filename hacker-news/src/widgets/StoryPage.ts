import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Story from './Story';
import Navigation from './Navigation';

import * as css from './styles/StoryPage.m.css';
import Header from "./Header";
import { story_type } from "../stories";
import { Item } from "../App";

export const StoryPageBase = ThemeableMixin(WidgetBase);


export interface StoryPageProperties extends WidgetProperties {
	stories: Item[];
	pageSize: number;
	page: number;
	pages: number;
	type: story_type;
}

@theme(css)
export default class StoryPage extends StoryPageBase<StoryPageProperties> {
	protected render(): DNode {
		const { page, type, pages } = this.properties;

		return v('div', { classes: this.classes(css.storyPage)}, [
			w<Header>(Header, { type }),
			w<Navigation>(Navigation, { page, pages, type }),
			v(
				'ol',
				{ start: 1 + (this.properties.pageSize * (page - 1)), classes: this.classes(css.list) },
				this.properties.stories.map((story) => w<Story>(Story, { ...story, key: story.localId }))
			)
		]);
	}
}


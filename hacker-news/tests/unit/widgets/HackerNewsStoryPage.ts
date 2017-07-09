import * as registerSuite from 'intern/lib/interfaces/object';
import { v, w } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsStoryPage, { HackerNewsStoryPageProperties } from '../../../src/widgets/HackerNewsStoryPage';
import { story_type } from "../../../src/interfaces";

import * as css from '../../../src/widgets/styles/hackerNewsStoryPage.m.css';
import HackerNewsNavigation from "../../../src/widgets/HackerNewsNavigation";
import HackerNewsHeader from "../../../src/widgets/HackerNewsHeader";
import HackerNewsStory from "../../../src/widgets/HackerNewsStory";

let hackerNewsStoryPage: Harness<HackerNewsStoryPageProperties, typeof HackerNewsStoryPage>;

registerSuite({
	name: 'HackerNewsStoryPage',

	beforeEach() {
		hackerNewsStoryPage = harness(HackerNewsStoryPage);
	},

	afterEach() {
		hackerNewsStoryPage.destroy();
	},

	'renders'() {
		const properties = {
			page: 5,
			view: 'new' as story_type,
			pages: 10,
			pageSize: 10,
			stories: [ 1, 2, 3].map((id) => ({
				id,
				by: 'The Author',
				score: 10,
				title: 'Important News',
				url: 'http://www.website.com',

				order: 0,
				updated: 0
			}))
		};
		const { page, pages, view, pageSize } = properties;

		hackerNewsStoryPage.setProperties(properties);
		hackerNewsStoryPage.expectRender(v('div', { classes: hackerNewsStoryPage.classes(css.storyPage)}, [
			w<HackerNewsHeader>(HackerNewsHeader, { view }),
			w<HackerNewsNavigation>(HackerNewsNavigation, { page, pages, view, pageSize }),
			v(
				'ol',
				{ start: 1 + (properties.pageSize * (page - 1)), classes: hackerNewsStoryPage.classes(css.list) },
				properties.stories.map((story) => w<HackerNewsStory>(HackerNewsStory, { ...story, key: String(story.order) }))
			)
		]);
	}
});


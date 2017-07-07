import * as registerSuite from 'intern/lib/interfaces/object';
import { v } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsStory, { HackerNewsStoryProperties } from '../../../src/widgets/HackerNewsStory';
import { Item } from "../../../src/interfaces";

import * as css from '../../../src/widgets/styles/hackerNewsStory.m.css';

let hackerNewsStory: Harness<HackerNewsStoryProperties, typeof HackerNewsStory>;

const oneMinute = 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneMonth = oneDay * 30;
const oneYear = oneMonth * 12;

const defaultItem: Item  = {
	id: 'item-id',
	by: 'The Author',
	score: 10,
	title: 'Important News',
	url: 'http://www.website.com',

	order: 0,
	updated: 0
};

function makeItem(customProperties: Partial<Item> = {}) {
	return { ...defaultItem, time: (Date.now()/1000) - 1, ...customProperties };
}

registerSuite({
	name: 'HackerNewsStory',

	beforeEach() {
		hackerNewsStory = harness(HackerNewsStory);
	},

	afterEach() {
		hackerNewsStory.destroy();
	},

	'uses largest non-zero unit of time'() {
		hackerNewsStory.setProperties(makeItem());

		function createStoryVDom(timeText: string) {
			return v('div', { classes: hackerNewsStory.classes(css.info) }, [
				'10 points by ',
				v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'The Author ' ]),
				`${timeText} ago | `,
				v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'discuss' ])
			]);
		}

		const expectedRender = v('li', { classes: hackerNewsStory.classes(css.story) }, [
			v('div', {}, [
				v(
					'a',
					{ href: defaultItem.url, classes: hackerNewsStory.classes(css.title) },
					[ defaultItem.title ]
				),
				v('span', { classes: hackerNewsStory.classes(css.domain) }, [ ' (website.com)' ])
			]),
			createStoryVDom('1 second')
		]);

		hackerNewsStory.expectRender(expectedRender);
	}
});


import * as registerSuite from 'intern/lib/interfaces/object';
import { v } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsStory, { HackerNewsStoryProperties } from '../../../src/widgets/HackerNewsStory';
import { Item } from "../../../src/interfaces";

import * as css from '../../../src/widgets/styles/hackerNewsStory.m.css';

let hackerNewsStory: Harness<HackerNewsStoryProperties, typeof HackerNewsStory>;


function secondsAgo(time: number) {
	return (Date.now()/1000) - time;
}

const minutesAgo = (times?: number) => secondsAgo(60 * (times || 0));
const hoursAgo = (times?: number) => secondsAgo(60 * 60 * (times || 0));
const daysAgo = (times?: number) => secondsAgo(60 * 60 * 24 * (times || 0));
const monthsAgo = (times?: number) => secondsAgo(60 * 60 * 24 * 30 * (times || 0));
const yearsAgo = (times?: number) => secondsAgo(60 * 60 * 24 * 30 * 12 * (times || 0));

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

	'uses largest non-zero unit of time and correct pluralization'() {
		hackerNewsStory.setProperties(makeItem());

		function createStoryVDom(timeText: string) {
			return v('li', { classes: hackerNewsStory.classes(css.story) }, [
				v('div', {}, [
					v(
						'a',
						{ href: defaultItem.url, classes: hackerNewsStory.classes(css.title) },
						[ defaultItem.title ]
					),
					v('span', { classes: hackerNewsStory.classes(css.domain) }, [ ' (website.com)' ])
				]),
				v('div', { classes: hackerNewsStory.classes(css.info) }, [
					'10 points by ',
					v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'The Author ' ]),
					`${timeText} ago | `,
					v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'discuss' ])
				])
			]);
		}

		hackerNewsStory.expectRender(createStoryVDom('1 second'));

		hackerNewsStory.setProperties(makeItem({ time: secondsAgo(2)}));

		hackerNewsStory.expectRender(createStoryVDom('2 seconds'));

		hackerNewsStory.setProperties(makeItem({ time: minutesAgo(1) }));

		hackerNewsStory.expectRender(createStoryVDom('1 minute'));

		hackerNewsStory.setProperties(makeItem({ time: minutesAgo(2) }));

		hackerNewsStory.expectRender(createStoryVDom('2 minutes'));

		hackerNewsStory.setProperties(makeItem({ time: hoursAgo(1)}));
		hackerNewsStory.expectRender(createStoryVDom('1 hour'));

		hackerNewsStory.setProperties(makeItem({ time: hoursAgo(2)}));
		hackerNewsStory.expectRender(createStoryVDom('2 hours'));

		hackerNewsStory.setProperties(makeItem({ time: daysAgo(1)}));
		hackerNewsStory.expectRender(createStoryVDom('1 day'));

		hackerNewsStory.setProperties(makeItem({ time: daysAgo(2)}));
		hackerNewsStory.expectRender(createStoryVDom('2 days'));

		hackerNewsStory.setProperties(makeItem({ time: monthsAgo(1)}));
		hackerNewsStory.expectRender(createStoryVDom('1 month'));

		hackerNewsStory.setProperties(makeItem({ time: monthsAgo(2)}));
		hackerNewsStory.expectRender(createStoryVDom('2 months'));

		hackerNewsStory.setProperties(makeItem({ time: yearsAgo(1)}));
		hackerNewsStory.expectRender(createStoryVDom('1 year'));

		hackerNewsStory.setProperties(makeItem({ time: yearsAgo(2)}));
		hackerNewsStory.expectRender(createStoryVDom('2 years'));
	},

	'parsing domain from url'() {
		const expectedRender = (href: string) => v('li', { classes: hackerNewsStory.classes(css.story) }, [
			v('div', {}, [
				v(
					'a',
					{ href, classes: hackerNewsStory.classes(css.title) },
					[ defaultItem.title ]
				),
				v('span', { classes: hackerNewsStory.classes(css.domain) }, [ ' (website.com)' ])
			]),
			v('div', { classes: hackerNewsStory.classes(css.info) }, [
				'10 points by ',
				v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'The Author ' ]),
				`1 second ago | `,
				v('span', { classes: hackerNewsStory.classes(css.infoLink) }, [ 'discuss' ])
			])
		]);

		hackerNewsStory.setProperties(makeItem({ url: 'https://www.website.com'}));
		hackerNewsStory.expectRender(expectedRender('https://www.website.com'));

		hackerNewsStory.setProperties(makeItem({ url: 'https://website.com'}));
		hackerNewsStory.expectRender(expectedRender('https://website.com'));
	}
});


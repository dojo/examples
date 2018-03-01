const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import { stub } from 'sinon';

import { v, w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { Tags } from './../../../src/widgets/Tags';

const mockEvent = {
	preventDefault() {}
};

describe('tags widget', () => {
	it('no tags', () => {
		const fetchFeed = stub();
		const h = harness(() => w(Tags, { fetchFeed }));
		const expected = v('div', { classes: 'col-md-3' }, [
			v('div', { classes: 'sidebar' }, [v('p', ['Popular Tags']), v('div', { classes: 'tag-list' }, [])])
		]);

		h.expect(() => expected);
	});

	it('with tags', () => {
		const fetchFeed = stub();
		const h = harness(() => w(Tags, { tags: ['first', 'second'], fetchFeed }));
		h.expect(() => v('div', { classes: 'col-md-3' }, [
			v('div', { classes: 'sidebar' }, [
				v('p', ['Popular Tags']),
				v('div', { classes: 'tag-list' }, [
					v('a', { href: '', onclick: () => {}, key: '0', classes: ['tag-pill', 'tag-default'] }, [
						'first'
					]),
					v('a', { href: '', onclick: () => {}, key: '1', classes: ['tag-pill', 'tag-default'] }, [
						'second'
					])
				])
			])
		]));

		h.trigger('@0', 'onclick', mockEvent);
		assert.isTrue(fetchFeed.calledOnce);
	});
});

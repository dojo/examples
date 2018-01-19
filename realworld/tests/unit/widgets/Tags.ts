const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import { stub } from 'sinon';

import { v } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import { Tags } from './../../../src/widgets/Tags';

const mockEvent = {
	preventDefault() {}
};

describe('tags widget', () => {
	it('no tags', () => {
		const widget = harness(Tags);
		const expected = v('div', { classes: 'col-md-3' }, [
			v('div', { classes: 'sidebar' }, [v('p', ['Popular Tags']), v('div', { classes: 'tag-list' }, [])])
		]);

		widget.expectRender(expected);
	});

	it('with tags', () => {
		const widget = harness(Tags);
		const fetchFeed = stub();
		widget.setProperties({ tags: ['first', 'second'], fetchFeed });
		const expected = v('div', { classes: 'col-md-3' }, [
			v('div', { classes: 'sidebar' }, [
				v('p', ['Popular Tags']),
				v('div', { classes: 'tag-list' }, [
					v('a', { href: '', onclick: widget.listener, key: '0', classes: ['tag-pill', 'tag-default'] }, [
						'first'
					]),
					v('a', { href: '', onclick: widget.listener, key: '1', classes: ['tag-pill', 'tag-default'] }, [
						'second'
					])
				])
			])
		]);

		widget.expectRender(expected);
		widget.callListener('onclick', { args: [mockEvent], key: '0' });
		assert.isTrue(fetchFeed.calledOnce);
	});
});

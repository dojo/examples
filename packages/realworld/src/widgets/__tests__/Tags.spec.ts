const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import { stub } from 'sinon';

import { v, w } from '@dojo/framework/core/vdom';
import harness from '@dojo/framework/testing/harness/harness';
import createMockStoreMiddleware from '@dojo/framework/testing/mocks/middleware/store';

import { fetchFeedProcess } from '../../processes/feedProcesses';
import { Tags } from '../Tags';
import store from '../../store';
import { replace } from '@dojo/framework/stores/state/operations';

const mockEvent = {
	preventDefault() {}
};

describe('tags widget', () => {
	it('no tags', () => {
		const fetchFeed = stub();
		const mockStore = createMockStoreMiddleware([[fetchFeedProcess, fetchFeed]]);
		const h = harness(() => w(Tags, {}), { middleware: [[store, mockStore]] });
		const expected = v('div', { classes: ['col-md-3'] }, [
			v('div', { classes: ['sidebar'] }, [v('p', ['Popular Tags']), v('div', { classes: ['tag-list'] }, [])])
		]);

		h.expect(() => expected);
	});

	it('with tags', () => {
		const fetchFeed = stub();
		const mockStore = createMockStoreMiddleware([[fetchFeedProcess, fetchFeed]]);
		const h = harness(() => w(Tags, {}), { middleware: [[store, mockStore]] });
		mockStore((path) => [replace(path('tags'), ['first', 'second'])]);
		h.expect(() =>
			v('div', { classes: ['col-md-3'] }, [
				v('div', { classes: ['sidebar'] }, [
					v('p', ['Popular Tags']),
					v('div', { classes: ['tag-list'] }, [
						v('a', { href: '', onclick: () => {}, key: '0', classes: ['tag-pill', 'tag-default'] }, [
							'first'
						]),
						v('a', { href: '', onclick: () => {}, key: '1', classes: ['tag-pill', 'tag-default'] }, [
							'second'
						])
					])
				])
			])
		);

		h.trigger('@0', 'onclick', mockEvent);
		assert.isTrue(fetchFeed.calledOnce);
	});
});

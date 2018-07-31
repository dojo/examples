const { describe, it, beforeEach } = intern.getInterface('bdd');
import harness from '@dojo/framework/testing/harness';

import { v, w } from '@dojo/framework/widget-core/d';

import InfiniteList from '../../../src/widgets/InfiniteList';
import * as css from '../../../src/widgets/styles/infiniteList.m.css';

let intersectionGetStub: any;

class TestWidget extends InfiniteList {
	constructor() {
		super();

		this.meta = (() => {
			return {
				get: intersectionGetStub
			};
		}) as any;
	}
}

describe('InfiniteList', () => {
	beforeEach(() => {
		intersectionGetStub = () => {
			return {
				isIntersecting: false
			};
		};
	});

	it('should render', () => {
		const h = harness(() => w(TestWidget, {
			onRequestItems: (index: number) => Promise.resolve([])
		}));
		h.expect(() =>
			v('div', {}, [
				v('div', { key: 'bottom', classes: css.bottom })
			])
		);
	});

	it('should request data when the bottom is visible', () => {
		const loadStub = () => {
			return Promise.resolve([v('div', {}, ['test'])]);
		};

		intersectionGetStub = () => {
			return {
				isIntersecting: true
			};
		};

		const h = harness(() => w(TestWidget, {
			onRequestItems: loadStub
		}));

		h.expect(() =>
			v('div', {}, [
				v('div', { key: 'bottom', classes: css.bottom })
			])
		);

		return new Promise(resolve => {
			setTimeout(() => {
				h.expect(() =>
					v('div', {}, [
						v('div', {}, ['test']),
						v('div', { key: 'bottom', classes: css.bottom })
					])
				);

				resolve();
			}, 10);
		});
	});
});

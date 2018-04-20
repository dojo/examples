const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/test-extras/harness';

import { v, w } from '@dojo/widget-core/d';
import Intersection from '@dojo/widget-core/meta/Intersection';
import { beforeEach } from 'intern/lib/interfaces/tdd';
import { stub } from 'sinon';

import InfiniteList from '../../../src/widgets/InfiniteList';
import * as css from '../../../src/widgets/styles/infiniteList.m.css';

let intersectionGetStub: any = stub();

class TestWidget extends InfiniteList {
	constructor() {
		super();

		const metaStub = stub();
		const intersectionStub = {
			get: intersectionGetStub
		};

		metaStub.withArgs(Intersection).returns(intersectionStub);

		this.meta = metaStub;
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

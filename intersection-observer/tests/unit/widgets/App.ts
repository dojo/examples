const { describe, it } = intern.getInterface('bdd');
import harness from '@dojo/test-extras/harness';

import { v, w } from '@dojo/widget-core/d';

import App from '../../../src/widgets/App';
import InfiniteList from '../../../src/widgets/InfiniteList';
import * as css from '../../../src/widgets/styles/app.m.css';

describe('App', () => {
	it('should render', () => {
		function getData(startIndex: number) {
			return Promise.resolve([]);
		}

		const h = harness(() => w(App, {}));
		h.expect(() =>
			v('div', { classes: css.root }, [
				v('h1', { classes: css.title }, ['Infinite Scrolling List']),
				w(InfiniteList, { onRequestItems: getData }, [])
			])
		);
	});
});

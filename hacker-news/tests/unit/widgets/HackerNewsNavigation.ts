import * as registerSuite from 'intern/lib/interfaces/object';
import { Link } from '@dojo/routing/Link';
import { v, w } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsNavigation, { HackerNewsNavigationProperties } from '../../../src/widgets/HackerNewsNavigation';
import * as css from '../../../src/widgets/styles/hackerNewsNavigation.m.css';

let hackerNewsNavigation: Harness<HackerNewsNavigationProperties, typeof HackerNewsNavigation>;


registerSuite({
	name: 'HackerNewsNavigation',

	beforeEach() {
		hackerNewsNavigation = harness(HackerNewsNavigation);
	},

	afterEach() {
		hackerNewsNavigation.destroy();
	},

	'one page'() {
		hackerNewsNavigation.setProperties({
			view: 'top',
			page: 1,
			pages: 1,
			pageSize: 1
		});

		hackerNewsNavigation.expectRender(v('div', { classes: hackerNewsNavigation.classes(css.navigation) }));
	},

	'first page'() {
		hackerNewsNavigation.setProperties({
			view: 'top',
			page: 1,
			pages: 10,
			pageSize: 1
		});

		hackerNewsNavigation.expectRender(v('div', { classes: hackerNewsNavigation.classes(css.navigation) }, [
			v('a', {
				afterCreate: () => {},
				afterUpdate: () => {},
				key: '< prev',
				href: 'javascript:void(0)',
				disabled: true,
				'aria-disabled': true,
				classes: hackerNewsNavigation.classes(css.disabled)
			}, [ '< prev' ]),
			v('span', { classes: hackerNewsNavigation.classes(css.pageNumber) }, [ `1/10` ]),
			w(Link, {
				key: 'next >',
				classes: hackerNewsNavigation.classes(css.link),
				to: 'stories',
				params: { view: 'top', page: '2' },
				isOutlet: true
			}, [ 'next >'])
		]));
	},

	'middle page'() {
		hackerNewsNavigation.setProperties({
			view: 'new',
			page: 2,
			pages: 10,
			pageSize: 1
		});

		hackerNewsNavigation.expectRender(v('div', { classes: hackerNewsNavigation.classes(css.navigation) }, [
			w(Link, {
				key: '< prev',
				classes: hackerNewsNavigation.classes(css.link),
				to: 'stories',
				params: { view: 'new', page: '1' },
				isOutlet: true
			}, [ '< prev' ]),
			v('span', { classes: hackerNewsNavigation.classes(css.pageNumber) }, [ `2/10` ]),
			w(Link, {
				key: 'next >',
				classes: hackerNewsNavigation.classes(css.link),
				to: 'stories',
				params: { view: 'new', page: '3' },
				isOutlet: true
			}, [ 'next >'])
		]));
	},

	'last page'() {
		hackerNewsNavigation.setProperties({
			view: 'show',
			page: 10,
			pages: 10,
			pageSize: 1
		});

		hackerNewsNavigation.expectRender(v('div', { classes: hackerNewsNavigation.classes(css.navigation) }, [
			w(Link, {
				key: '< prev',
				classes: hackerNewsNavigation.classes(css.link),
				to: 'stories',
				params: { view: 'show', page: '9' },
				isOutlet: true
			}, [ '< prev']),
			v('span', { classes: hackerNewsNavigation.classes(css.pageNumber) }, [ `10/10` ]),
			v('a', {
				afterCreate: () => {},
				afterUpdate: () => {},
				key: 'next >',
				href: 'javascript:void(0)',
				disabled: true,
				'aria-disabled': true,
				classes: hackerNewsNavigation.classes(css.disabled)
			}, [ 'next >' ])
		]));
	},
});

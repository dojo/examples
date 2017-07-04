import * as registerSuite from 'intern/lib/interfaces/object';
import { Link } from '@dojo/routing/Link';
import { v, w } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsHeader, { HackerNewsHeaderProperties } from '../../../src/widgets/HackerNewsHeader';
import * as css from '../../../src/widgets/styles/hackerNewsHeader.m.css';

let hackerNewsHeader: Harness<HackerNewsHeaderProperties, typeof HackerNewsHeader>;

registerSuite({
	name: 'HackerNewsHeader',
	beforeEach() {
		hackerNewsHeader = harness(HackerNewsHeader);
	},

	afterEach() {
		hackerNewsHeader.destroy();
	},

	default() {
		hackerNewsHeader.expectRender(v('header', { classes: hackerNewsHeader.classes(css.header) }, [
			v('img', { classes: hackerNewsHeader.classes(css.logo), src: 'images/dojo2-logo-white.svg' }),
			v(
				'nav',
				{ classes: hackerNewsHeader.classes(css.nav) },
				[ 'top', 'new', 'show', 'ask', 'jobs' ].map(
					(view: string) => w(Link, {
						classes: hackerNewsHeader.classes(css.link),
						key: view,
						to: 'stories',
						params: { view, page: '1' },
						isOutlet: true
					}, [ `${view[ 0 ].toUpperCase()}${view.slice(1)}` ])
				)
			)
		]));
	},

	'with active view'() {
		const currentView = 'show';
		hackerNewsHeader.setProperties({
			view: currentView
		});

		hackerNewsHeader.expectRender(v('header', { classes: hackerNewsHeader.classes(css.header) }, [
			v('img', { classes: hackerNewsHeader.classes(css.logo), src: 'images/dojo2-logo-white.svg' }),
			v(
				'nav',
				{ classes: hackerNewsHeader.classes(css.nav) },
				[ 'top', 'new', 'show', 'ask', 'jobs' ].map(
					(view: string) => w(Link, {
						classes: hackerNewsHeader.classes(view === currentView ? css.activeLink : css.link),
						key: view,
						to: 'stories',
						params: { view, page: '1' },
						isOutlet: true
					}, [ `${view[ 0 ].toUpperCase()}${view.slice(1)}` ])
				)
			)
		]));
	}


});

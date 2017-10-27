import * as registerSuite from 'intern!object';
import harness from '@dojo/test-extras/harness';
import { v, w } from '@dojo/widget-core/d';
import App from '../../src/App';
import * as AppCSS from '../../src/styles/app.m.css';

import Button from '@dojo/widgets/button/Button';
import dojoTheme from '@dojo/widgets/themes/dojo/theme';

registerSuite({
	name: 'Widget Showcase',

	'basic rendering'() {
		const widget = harness(App);

		const expected = v('div', {
			classes: widget.classes(AppCSS.content)
		}, [
			v('h1', [ 'Form components' ]),
			v('div', {
				classes: widget.classes(AppCSS.component)
			}, [
				w(Button, {
					key: 'basic-button',
					theme: dojoTheme
				}, [ 'Basic' ])
			]),
		]);

		widget.expectRender(expected);
		widget.destroy();
	}
});
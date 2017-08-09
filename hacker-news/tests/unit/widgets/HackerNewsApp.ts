import * as registerSuite from 'intern/lib/interfaces/object';
import { w } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import harness, { Harness } from '@dojo/test-extras/harness';

import HackerNewsApp from '../../../src/widgets/HackerNewsApp';
import HackerNewsStoryPageOutlet from "../../../src/outlets/HackerNewsStoryPageOutlet";


let hackerNewsApp: Harness<WidgetProperties, typeof HackerNewsApp>;

registerSuite({
	name: 'HackerNewsApp',

	beforeEach() {
		hackerNewsApp = harness(HackerNewsApp);
	},

	afterEach() {
		hackerNewsApp.destroy();
	},

	render() {
		hackerNewsApp.expectRender(w(HackerNewsStoryPageOutlet, {}));
	}
});

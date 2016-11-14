import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';

export type AboutState = {}
export type About = Widget<AboutState>

const createAbout = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		classes: [ 'animated', 'pageHolder', 'about' ],
		childNodeRenderers: [
			function(this: About): DNode[] {
				const heading = d('h1', { innerHTML: 'About' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		]
	});

export default createAbout;

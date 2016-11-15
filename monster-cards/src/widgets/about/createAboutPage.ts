import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';

export type AboutPageState = {}
export type AboutPage = Widget<AboutPageState>

const createAboutPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		tagName: 'div.animated.pageHolder.about',
		childNodeRenderers: [
			function(this: AboutPage): DNode[] {
				const heading = d('h1', { innerHTML: 'About' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		]
	});

export default createAboutPage;

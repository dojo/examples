import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';
import * as css from './about.module.styl';

export type AboutPage = Widget<WidgetState>

const createAboutPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'about' ],
			childNodeRenderers: [
				function(this: AboutPage): DNode[] {
					const heading = d('h1', { innerHTML: 'About' });
					const jumbotron = d(`div.${ css.jumbotron.replace(/\s/g, '.') }`, {}, [ heading ]);

					return [ jumbotron ];
				}
			]
		}
	});

export default createAboutPage;

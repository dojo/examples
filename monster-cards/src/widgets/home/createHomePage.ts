import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';
import * as css from './home.module.styl';

export type HomePageState = {}
export type HomePage = Widget<HomePageState>

const createHomePage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'home' ],
			childNodeRenderers: [
				function(this: HomePage): DNode[] {
					const mmLogo = d('img', { src: './images/mm_logo.png' });
					const jumbotron = d(`div.${ css.jumbotron.replace(/\s/g, '.') }`, {}, [ mmLogo ]);

					return [ jumbotron ];
				}
			]
		}
	});

export default createHomePage;

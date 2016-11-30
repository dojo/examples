import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';
import { formatClasses } from '../../util';
import * as css from './home.module.styl';
import * as generalCss from './../common/general.module.styl';

export type HomePageState = {}
export type HomePage = Widget<HomePageState>

const createHomePage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', generalCss.pageHolder, 'home' ],
			childNodeRenderers: [
				function(this: HomePage): DNode[] {
					const mmLogo = d('img', { src: './images/mm_logo.png' });
					const jumbotron = d(`div.${ formatClasses(css.jumbotron) }`, {}, [ mmLogo ]);

					return [ jumbotron ];
				}
			]
		}
	});

export default createHomePage;

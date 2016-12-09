import { Widget, DNode } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import { v } from 'dojo-widgets/d';

export type HomePageState = {}
export type HomePage = Widget<HomePageState>

const createHomePage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'home' ],
			getChildrenNodes: function(this: HomePage): DNode[] {
				const mmLogo = v('img', { src: './images/mm_logo.png' });
				const jumbotron = v('div.jumbotron', {}, [ mmLogo ]);

				return [ jumbotron ];
			}
		}
	});

export default createHomePage;

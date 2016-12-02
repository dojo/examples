import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/d';

export type AboutPage = Widget<WidgetState>

const createAboutPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'about' ],
			getChildrenNodes: function(this: AboutPage): DNode[] {
				const heading = d('h1', { innerHTML: 'About' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		}
	});

export default createAboutPage;

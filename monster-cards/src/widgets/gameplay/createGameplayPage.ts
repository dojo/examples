import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/d';

export type GameplayPage = Widget<WidgetState>

const createGameplayPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'gameplay' ],
			getChildrenNodes: function(this: GameplayPage): DNode[] {
				const heading = d('h1', { innerHTML: 'Gameplay' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		}
	});

export default createGameplayPage;

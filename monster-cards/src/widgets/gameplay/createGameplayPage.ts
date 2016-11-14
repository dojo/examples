import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';

export type GameplayPageState = {}
export type GameplayPage = Widget<GameplayPageState>

const createGameplayPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		classes: [ 'animated', 'pageHolder', 'gameplay' ],
		childNodeRenderers: [
			function(this: GameplayPage): DNode[] {
				const heading = d('h1', { innerHTML: 'Gameplay' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		]
	});

export default createGameplayPage;

import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';

export type GameplayState = {}
export type Gameplay = Widget<GameplayState>

const createGameplay = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		classes: [ 'animated', 'pageHolder', 'gameplay' ],
		childNodeRenderers: [
			function(this: Gameplay): DNode[] {
				const heading = d('h1', { innerHTML: 'Gameplay' });
				const jumbotron = d('div.jumbotron', {}, [ heading ]);

				return [ jumbotron ];
			}
		]
	});

export default createGameplay;

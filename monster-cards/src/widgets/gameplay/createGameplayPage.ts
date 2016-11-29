import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';
import * as css from './gameplay.module.styl';

export type GameplayPage = Widget<WidgetState>

const createGameplayPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'gameplay' ],
			childNodeRenderers: [
				function(this: GameplayPage): DNode[] {
					const heading = d('h1', { innerHTML: 'Gameplay' });
					const jumbotron = d(`div.${ css.jumbotron.replace(/\s/g, '.') }`, {}, [ heading ]);

					return [ jumbotron ];
				}
			]
		}
	});

export default createGameplayPage;

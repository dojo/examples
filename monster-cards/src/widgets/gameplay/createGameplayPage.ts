import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import d from 'dojo-widgets/util/d';
import { formatClasses } from '../../util';
import * as css from './gameplay.module.styl';
import * as generalCss from './../common/general.module.styl';

export type GameplayPage = Widget<WidgetState>

const createGameplayPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', generalCss.pageHolder, 'gameplay' ],
			childNodeRenderers: [
				function(this: GameplayPage): DNode[] {
					const heading = d('h1', { innerHTML: 'Gameplay' });
					const jumbotron = d(`div.${ formatClasses(css.jumbotron) }`, {}, [ heading ]);

					return [ jumbotron ];
				}
			]
		}
	});

export default createGameplayPage;

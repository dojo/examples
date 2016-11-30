import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createCardsList from './createCardsList';
import { CardSummaryState } from '../card/createCardSummary';
import d from 'dojo-widgets/util/d';
import * as css from '../common/jumbotron.module.styl';
import * as generalCss from './../common/general.module.styl';

export type CardsPageState = WidgetState & {
	cards: CardSummaryState[];
}
export type CardsPage = Widget<CardsPageState>

const createCardsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', generalCss.pageHolder, 'cards' ],
			childNodeRenderers: [
				function(this: CardsPage): DNode[] {
					const jumbotron = d(`div.${ css.jumbotron }`);
					const cardsList = d(createCardsList, { state: this.state });

					return [ jumbotron, cardsList ];
				}
			]
		}
	});

export default createCardsPage;

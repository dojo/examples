import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createCardsList from './createCardsList';
import { CardSummaryState } from '../card/createCardSummary';
import d from 'dojo-widgets/util/d';

export type CardsPageState = WidgetState & {
	cards: CardSummaryState[];
}
export type CardsPage = Widget<CardsPageState>

const createCardsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.override({
		classes: [ 'animated', 'pageHolder', 'cards' ],
		childNodeRenderers: [
			function(this: CardsPage): DNode[] {
				const jumbotron = d('div.jumbotron');
				const cardsList = d(createCardsList, { state: this.state });

				return [ jumbotron, cardsList ];
			}
		]
	});

export default createCardsPage;

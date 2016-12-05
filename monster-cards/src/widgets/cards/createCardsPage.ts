import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createCardsList from './createCardsList';
import { CardSummaryState } from '../card/createCardSummary';
import d from 'dojo-widgets/d';

export type CardsPageState = WidgetState & {
	cards: CardSummaryState[];
}
export type CardsPage = Widget<CardsPageState>

const createCardsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'cards' ],
			getChildrenNodes: function(this: CardsPage): DNode[] {
				const jumbotron = d('div.jumbotron');
				const cardsList = d(createCardsList, { state: this.state });

				return [ jumbotron, cardsList ];
			}
		}
	});

export default createCardsPage;

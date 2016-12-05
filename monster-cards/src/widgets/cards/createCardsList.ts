import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';
import createCardSummary, { CardSummaryState } from '../card/createCardSummary';

export type CardListState = WidgetState & {
	cards: CardSummaryState[];
}

export type CardList = Widget<CardListState>;

const createCardList = createWidgetBase
	.mixin({
		mixin: {
			classes: [ 'cardList' ],
			getChildrenNodes: function(this: CardList): DNode[] {
				const { cards = [] } = this.state;

				return cards.map((state) => {
					return d(createCardSummary, { id: `card-list-summary-${state.id}`, state });
				});
			}
		}
	});

export default createCardList;

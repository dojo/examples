import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCardSummary, { CardSummaryState } from '../card/createCardSummary';

export type CardListState = {
	cards: CardSummaryState[];
}

export type CardList = Widget<CardListState>;

const createCardList = createWidgetBase
	.extend({
		tagName: 'div.cardList',
		childNodeRenderers: [
			function(this: CardList): DNode[] {
				const { cards } = this.state;

				const cardNodes = cards.map((card) => {
					return d(createCardSummary, { id: card.cardId, state: card });
				});

				return cardNodes;
			}
		]
	});

export default createCardList;

import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCardSummary, { CardSummaryState } from '../card/createCardSummary';

export type CardListState = WidgetState & {
	cards: CardSummaryState[];
}

export type CardList = Widget<CardListState>;

const createCardList = createWidgetBase
	.mixin({
		mixin: {
			classes: [ 'cardList' ],
			childNodeRenderers: [
				function(this: CardList): DNode[] {
					const { cards } = this.state;

					return cards.map((state) => {
						return d(createCardSummary, { id: `card-list-summary-${state.id}`, state });
					});
				}
			]
		}
	});

export default createCardList;

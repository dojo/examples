import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { Card } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

function createWidgetsRecords(item: Card) {
	const cardId = item.id;
	return widgetStore.put([
		assign({}, <any> item, {
			type: 'milestone-card',
			cardId
		}),
		assign({}, <any> item, {
			type: 'milestone-card-summary',
			id: `summary-${item.id}`,
			cardId
		}),
		assign({}, <any> item, {
			type: 'card-description',
			classes: [ 'animated', 'cardDetailsDescription' ],
			id: `description-${item.id}`,
			enterAnimation: 'fadeInRight',
			exitAnimation: 'fadeOutLeft'
		})
	]);
}

export const putCard = createAction({
	do(cards: Card[]) {
		if (cards.length) {
			return Promise.all(cards.map(createWidgetsRecords))
				.then((response: any) => {
					const cardIds: string[] = [];
					const summaryIds: string[] = [];

					response.forEach(([card, summary]: [Card, Card]) => {
						cardIds.push(card.id);
						summaryIds.push(summary.id);
					});

					return widgetStore.patch([
						{ id: 'cardDetailsNavbar', children: cardIds },
						{ id: 'cardsList', children: summaryIds }]);
				});
		}
	}
});

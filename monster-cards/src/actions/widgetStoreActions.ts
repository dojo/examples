import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { ChangeRecord, Card } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

function createWidgetsRecords(item: Card) {
	const cardId = item.id;
	return Promise.all([
		widgetStore.put(assign({}, <any> item, {
			type: 'milestone-card',
			cardId
		})),
		widgetStore.put(assign({}, <any> item, {
			type: 'milestone-card-summary',
			id: `summary-${item.id}`,
			cardId
		})),
		widgetStore.put(assign({}, <any> item, {
			type: 'card-description',
			classes: [ 'animated' ],
			id: `description-${item.id}`,
			enterAnimation: 'fadeInRightBig',
			exitAnimation: 'fadeOutRightBig'
		}))
	]);
}

export const putCard = createAction({
	do({ afterAll, puts }: ChangeRecord) {
		if (puts.length) {
			return Promise.all(puts.map(createWidgetsRecords))
				.then((response: any) => {
					const cardIds: string[] = [];
					const summaryIds: string[] = [];

					response.forEach(([card, summary]: [Card, Card]) => {
						cardIds.push(card.id);
						summaryIds.push(summary.id);
					});

					widgetStore.patch({ id: 'cardDetailsNavbar', children: cardIds });
					widgetStore.patch({ id: 'cardsList', children: summaryIds });
				});
		}
	}
});

import createAction from 'dojo-actions/createAction';

import { ChangeRecord, Card } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

import { CardState } from '../widgets/card/createCard';
import { CardSummaryState } from '../widgets/card/createCardSummary';

function getStates(cards: Card[]): [ CardState[], CardSummaryState[] ] {
	const cardStates: CardState[] = [];
	const cardSummaryStates: CardSummaryState[] = [];

	cards.forEach(function (card) {
		const {
			id: cardId,
			name,
			imageClass,
			score
		} = card;

		cardStates.push({ cardId, imageClass });
		cardSummaryStates.push({ name, imageClass, score, cardId });
	});

	return [ cardStates, cardSummaryStates ];
}

export const putCard = createAction({
	do({ afterAll, puts }: ChangeRecord) {
		if (puts.length) {
			const [ cardStates, cardSummaryStates ] = getStates(afterAll);

			widgetStore.patch({ id: 'cards', cards: cardSummaryStates });
			widgetStore.patch({ id: 'cardDetails', cards: cardStates });
		}
	}
});

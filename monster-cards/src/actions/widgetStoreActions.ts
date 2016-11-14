import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { ChangeRecord, Card } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

import { CardState } from '../widgets/card/createCard';
import { CardSummaryState } from '../widgets/card/createCardSummary';

function createWidgetsRecords(item: Card) {
	return widgetStore.put(assign({}, <any> item, {
		type: 'card-description',
		classes: [ 'animated', 'cardDetailsDescription' ],
		id: `description-${item.id}`,
		enterAnimation: 'fadeInRight',
		exitAnimation: 'fadeOutLeft'
	}));
}

function getCardState({ id: cardId, imageClass }: Card): CardState {
	return {
		cardId,
		imageClass
	};
}

function getCardSummaryState({ id: cardId, name, imageClass, score }: Card): CardSummaryState {
	return {
		name,
		imageClass,
		score,
		cardId
	};
}

export const putCard = createAction({
	do({ afterAll, puts }: ChangeRecord) {
		if (puts.length) {

			widgetStore.patch({ id: 'cardDetailsNavbar', cards: afterAll.map(getCardState) });
			widgetStore.patch({ id: 'cards', cards: afterAll.map(getCardSummaryState) });

			return Promise.all(puts.map(createWidgetsRecords));
		}
	}
});

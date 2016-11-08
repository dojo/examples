import createAction from 'dojo-actions/createAction';
import widgetStore from '../stores/widgetStore';
import { pickRandomCards, Card } from '../stores/cardStore';
import { assign } from 'dojo-core/lang';
import { CardSummaryState } from '../widgets/card/createCardSummary';

function getCardSummaryDetails(card: Card): CardSummaryState {
	const { id, name, score, imageClass } = card;
	return {
		cardId: id,
		name,
		score,
		imageClass
	};
};

export const gotoCardDetails = createAction({
	do({ id }) {
		debugger;
		return Promise.all([
			widgetStore.patch({ id: 'cardDetailsJumbotron', children: [ `description-${id}` ] }),
			widgetStore.patch({ id: 'container', children: [ 'cardDetails' ] }),
			pickRandomCards(2, [ id ]).then(([ card1, card2 ]) => {
				return Promise.all([
					widgetStore.patch(assign({ id: 'cardDetailsSeenWithCard1' }, getCardSummaryDetails(card1))),
					widgetStore.patch(assign({ id: 'cardDetailsSeenWithCard2' }, getCardSummaryDetails(card2)))
				]);
			})
		]);
	}
});

export const gotoCards = createAction({
	do() {
		return widgetStore.patch({ id: 'container', children: [ 'cards' ] });
	}
});

export const gotoHome = createAction({
	do() {
		return widgetStore.patch({ id: 'container', children: [ 'home' ] });
	}
});

export const gotoAbout = createAction({
	do() {
		return widgetStore.patch({ id: 'container', children: [ 'about' ] });
	}
});

export const gotoGameplay = createAction({
	do() {
		return widgetStore.patch({ id: 'container', children: [ 'gameplay' ] });
	}
});

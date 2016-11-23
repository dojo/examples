import createAction from 'dojo-actions/createAction';
import widgetStore from '../stores/widgetStore';
import { CardDetailsRouteParameters } from '../routes';
import cardStore, { pickRandomCards } from '../stores/cardStore';

export const gotoCardDetails = createAction({
	do({ id }: CardDetailsRouteParameters) {
		return cardStore.get(id).then(function (cardDescription) {
			return pickRandomCards(2, [ id ]).then((seenWith) => {
				return Promise.all([
					widgetStore.patch({ id: 'cardDetails', cardDescription, seenWith }),
					widgetStore.patch({ id: 'container', children: [ 'cardDetails' ] })
				]);
			});
		});
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

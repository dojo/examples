import createAction from 'dojo-actions/createAction';

import { addFavoriteCard, removeFavoriteCard } from './favoriteCardActions';

import widgetStore from './../stores/widgetStore';

export const favoriteCard = createAction({
	do(card: any) {
		const { cardId } = card;
		return addFavoriteCard.do({ cardId });
	}
});

export const unfavoriteCard = createAction({
	do(card: any) {
		const { cardId } = card;
		return removeFavoriteCard.do({ cardId });
	}
});

export const showFavorites = createAction({
	do() {
		return widgetStore.patch({
			id: 'navbar-favorites',
			children: [ 'navbar-fav-icon', 'navbar-fav-cards' ]
		});
	}
});

export const hideFavorites = createAction({
	do() {
		return widgetStore.patch({
			id: 'navbar-favorites',
			children: [ 'navbar-fav-icon' ]
		});
	}
});

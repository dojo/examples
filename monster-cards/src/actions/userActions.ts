import createAction from 'dojo-actions/createAction';

import { addFav, removeFav } from './favStoreActions';

import widgetStore from './../stores/widgetStore';

export const cardFav = createAction({
	do(card: any) {
		addFav.do({ id: card.cardId });
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

export const cardUnfav = createAction({
	do(card: any) {
		removeFav.do({ id: card.cardId });
	}
});

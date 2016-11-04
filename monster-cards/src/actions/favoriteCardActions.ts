import createAction from 'dojo-actions/createAction';
import cardStore from '../stores/cardStore';
import favoriteCardStore from '../stores/favoriteCardStore';

export const addFavoriteCard = createAction({
	do(options: any) {
		return cardStore.get(options.id).then((card) => {
			return favoriteCardStore.put(card);
		});
	}
});

export const removeFavoriteCard = createAction({
	do(options: any) {
		return favoriteCardStore.delete(options.id);
	}
});

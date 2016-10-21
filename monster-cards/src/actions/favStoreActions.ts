import createAction from 'dojo-actions/createAction';

import cardStore from '../stores/cardStore';
import favCardStore from '../stores/favoriteStore';

export const addFav = createAction({
	do(options: any) {
		return cardStore.get(options.id).then((card) => {
			favCardStore.put(card);
		});
	}
});

export const removeFav = createAction({
	do(options: any) {
		return favCardStore.delete(options.id);
	}
});

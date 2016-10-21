import createAction from 'dojo-actions/createAction';

import { addFav, removeFav } from './favStoreActions';

export const cardFav = createAction({
	do(card: any) {
		addFav.do({ id: card.id });
	}
});

export const cardUnfav = createAction({
	do(card: any) {
		removeFav.do({ id: card.id });
	}
});

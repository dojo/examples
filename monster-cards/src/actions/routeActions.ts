import createAction from 'dojo-actions/createAction';
import widgetStore from '../stores/widgetStore';
import cardStore from '../stores/cardStore';

export const gotoCardDetails = createAction({
	do({ id }) {
		return Promise.all([
			cardStore.get(id).then(function (cardDescription) {
				return widgetStore.patch({ id: 'cardDetails', cardDescription });
			}),
			widgetStore.patch({ id: 'container', children: [ 'cardDetails' ] })
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

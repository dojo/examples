import createAction from 'dojo-actions/createAction';
import widgetStore from '../stores/widgetStore';

export const gotoCardDetails = createAction({
	do({ id }) {
		return Promise.all([
			widgetStore.patch({ id: 'cardDetailsJumbotron', children: [ `description-${id}` ] }),
			widgetStore.patch({ id: 'container', children: [ 'cardDetails' ] })
		]);
	}
});

export const gotoCards = createAction({
	do() {
		return widgetStore.patch({ id: 'container', children: [ 'cards' ] });
	}
});

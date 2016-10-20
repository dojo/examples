import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { ChangeRecord, Card } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

function createWidgetsRecords(item: Card) {
	return Promise.all([
		widgetStore.put(assign({}, <any> item, { type: 'milestone-card' })),
		widgetStore.put(assign({}, <any> item, {
			type: 'card-description',
			classes: [ 'animated' ],
			id: `description-${item.id}`,
			enterAnimation: 'fadeInRightBig',
			exitAnimation: 'fadeOutRightBig'
		}))
	]);
}

export const putCard = createAction({
	do({ afterAll, puts }: ChangeRecord) {
		if (puts.length) {
			const children = afterAll.map(({ id }) => id);

			return Promise.all(puts.map(createWidgetsRecords))
				.then(() => widgetStore.patch({ id: 'cardDetailsNavbar', children: children }));
		}
	}
});

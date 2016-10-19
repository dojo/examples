import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';

import { ChangeRecord } from '../stores/cardStore';
import widgetStore from '../stores/widgetStore';

export const putCard = createAction({
	do({ beforeAll, puts }: ChangeRecord) {
		if (puts.length) {
			const [ item ] = puts;
			const children = beforeAll.map(({ id }) => id);

			return Promise.all([
				widgetStore.put(assign({}, <any> item, { type: 'milestone-card' })),
				widgetStore.put(assign({}, <any> item, { type: 'card-description', id: `description-${item.id}` }))
			]).then(() => {
				return widgetStore.patch({
					id: 'cardDetailsNavbar',
					children: [ ...children, item.id ] });
			});
		}
	}
});

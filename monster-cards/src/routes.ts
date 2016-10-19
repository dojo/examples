import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import createHashHistory from 'dojo-routing/history/createHashHistory';

import { gotoCardDetails as gotoCardDetailsAction } from './actions/routeActions';

const cardDetailRoute = createRoute({
	path: 'cards/{id}',
	exec (request: any) {
		const { id } = request.params;
		return gotoCardDetailsAction.do({ id });
	}
});

export const router = createRouter();

router.append(cardDetailRoute);

export const historyManager = createHashHistory();

export default function start() {
	return router.observeHistory(historyManager, {}, true);
}

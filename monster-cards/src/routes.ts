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

export const history = createHashHistory();

const router = createRouter({ history });
router.append(cardDetailRoute);

export default router;

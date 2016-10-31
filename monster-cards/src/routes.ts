import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import createHashHistory from 'dojo-routing/history/createHashHistory';

import {
	gotoCardDetails as gotoCardDetailsAction,
	gotoCards as gotoCardsAction,
	gotoHome as gotoHomeAction
} from './actions/routeActions';

const cardDetailRoute = createRoute({
	path: 'cards/{id}',
	exec (request: any) {
		const { id } = request.params;
		return gotoCardDetailsAction.do({ id });
	}
});

const cardsRoute = createRoute({
	path: 'cards',
	exec (request: any) {
		return gotoCardsAction.do();
	}
});

const homeRoute = createRoute({
	path: '',
	exec (request: any) {
		return gotoHomeAction.do();
	}
});

export const history = createHashHistory();

const router = createRouter({ history });

export default router;

router.append([
	cardsRoute,
	cardDetailRoute,
	homeRoute
]);

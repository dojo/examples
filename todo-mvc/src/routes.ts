import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import { Parameters } from 'dojo-routing/interfaces';
import createHashHistory from 'dojo-routing/history/createHashHistory';

import { filter as filterAction } from './actions/userActions';

interface FilterParameters extends Parameters {
	filter: 'active' | 'all' | 'completed';
}

const filterRoute = createRoute<FilterParameters>({
	path: '/{filter}',

	params([filter]) {
		switch (filter) {
			case 'active':
				return { filter: 'active' };
			case 'all':
				return { filter: 'all' };
			case 'completed':
				return { filter: 'completed' };
			default:
				return null;
		}
	},

	exec(request) {
		const { filter } = request.params;
		return filterAction.do({ filter });
	}
});

export const history = createHashHistory();

const router = createRouter({ history });

export default router;

router.append(filterRoute);

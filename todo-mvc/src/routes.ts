import { App } from 'dojo-app/createApp';
import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import { Parameters } from 'dojo-routing/interfaces';
import createHashHistory from 'dojo-routing/history/createHashHistory';

interface FilterParameters extends Parameters {
	filter: 'active' | 'all' | 'completed';
}

export default function start(app: App) {
	return app.getAction('filter').then((filterAction) => {
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

		const router = createRouter();
		router.append(filterRoute);
		return router.observeHistory(createHashHistory(), {}, true);
	});
}

import HashHistory from '@dojo/routing/history/HashHistory';
import { Parameters } from '@dojo/routing/interfaces';
import Route from '@dojo/routing/Route';
import Router from '@dojo/routing/Router';
import { filterAndView, setHierarchy, showTodoDetails } from './actions/widgetStoreActions';

type FilterValue = 'active' | 'all' | 'completed';
type ViewValue = 'list' | 'cards';

interface AppParameters extends Parameters {
	filter: FilterValue;
	view: ViewValue;
}

interface TodoIdParameter extends Parameters {
	todoId: string;
}

export const mainRoute = new Route({
	path: '/{filter}?{view}',
	params([ filter ], searchParams) {
		let activeFilter: FilterValue;
		let activeView: ViewValue;
		const view = searchParams.get('view');

		switch (filter) {
			case 'active':
			case 'all':
			case 'completed':
				activeFilter = filter;
				break;
			default:
				activeFilter = 'all';
		}

		switch (view) {
			case 'cards':
			case 'list':
				activeView = view;
				break;
			default:
				activeView = 'list';
		}

		return {
			filter: activeFilter,
			view: activeView
		};
	},
	exec(request) {
		const { filter, view = 'list' } = request.params as AppParameters;
		setHierarchy([ [ 'main', {} ] ]);
		return filterAndView(filter, view);
	}
});

export const todoViewRoute = new Route({
	path: '/todos/{todoId}',

	exec(request) {
		const { todoId } = request.params as TodoIdParameter;

		return showTodoDetails(todoId);
	}
});

const router = new Router({
	history: new HashHistory(),

	fallback() {
		setHierarchy([ [ 'main', {} ] ]);
		return filterAndView('all', 'list');
	}
});
mainRoute.append(todoViewRoute);
router.append(mainRoute);

export default router;

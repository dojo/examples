import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import { Parameters } from 'dojo-routing/interfaces';
import createHashHistory from 'dojo-routing/history/createHashHistory';
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

export const mainRoute = createRoute<AppParameters>({
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

export const todoViewRoute = createRoute({
	path: '/todos/{todoId}',

	exec(request) {
		const { todoId } = request.params as TodoIdParameter;

		return showTodoDetails(todoId);
	}
});

const router = createRouter({
	history: createHashHistory(), fallback() {
		setHierarchy([ [ 'main', {} ] ]);
		return filterAndView('all', 'list');
	}
});
mainRoute.append(todoViewRoute);
router.append(mainRoute);

export default router;

import global from '@dojo/core/global';
import { assign } from '@dojo/core/lang';
import loadCldrData from '@dojo/i18n/cldr/load';
import { systemLocale } from '@dojo/i18n/i18n';
import { HashHistory } from '@dojo/routing/history/HashHistory';
import { Parameters } from '@dojo/routing/interfaces';
import { Route } from '@dojo/routing/Route';
import { Router } from '@dojo/routing/router';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import registerCustomElement from '@dojo/widget-core/registerCustomElement';
import likelySubtags from './nls/likelySubtags';
import App from './widgets/App';
import createGithubIssuesElement from './widgets/custom/createGithubIssuesElement';

type FilterValue = 'active' | 'all' | 'completed';
type ViewValue = 'list' | 'cards';

interface AppParameters extends Parameters {
	filter: FilterValue;
	view: ViewValue;
}

interface TodoIdParameter extends Parameters {
	todoId: string;
}

if (global.customElements) {
	registerCustomElement(createGithubIssuesElement);
}

const appProjector = ProjectorMixin(App);
const projector = new appProjector();

global.projector = projector;

projector.root = document.getElementsByTagName('my-app')[ 0 ];

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

		projector.setProperties(assign({}, projector.properties, {
			showDetails: '',
			activeFilter: filter,
			activeView: view
		}));
	}
});

export const todoViewRoute = new Route({
	path: '/todos/{todoId}',

	exec(request) {
		const { todoId } = request.params as TodoIdParameter;

		projector.setProperties(assign({}, projector.properties, {
			showDetails: todoId
		}));
	}
});

const router = new Router({
	history: new HashHistory(),

	fallback() {
		projector.setProperties(assign({}, projector.properties, {
			showDetails: '',
			activeFilter: 'all',
			activeView: 'list'
		}));
	}
});

mainRoute.append(todoViewRoute);
router.append(mainRoute);

Promise.all([
	loadCldrData({
		main: {
			[systemLocale]: {}
		}
	}),
	loadCldrData(likelySubtags)
]).then(() => {
	if (projector.root) {
		projector
			.append()
			.then(() => router.start());
	}
});

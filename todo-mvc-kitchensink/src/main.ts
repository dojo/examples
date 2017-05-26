import './registerWidgets';
import global from '@dojo/core/global';
import { switchLocale } from '@dojo/i18n/i18n';
import { assign } from '@dojo/core/lang';
import { HashHistory } from '@dojo/routing/history/HashHistory';
import { Parameters } from '@dojo/routing/interfaces';
import { Route } from '@dojo/routing/Route';
import { Router } from '@dojo/routing/Router';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themeable';
import registerCustomElement from '@dojo/widget-core/registerCustomElement';
import setLocaleData from './setLocaleData';
import App from './widgets/App';
import createGithubIssuesElement from './widgets/custom/createGithubIssuesElement';
import pirateThemeStyles from './themes/pirate';

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

const themeContext = registerThemeInjector(undefined);

function changeTheme(wantsPirate: boolean) {
	if (wantsPirate) {
		switchLocale('en-PR');
		themeContext.set(pirateThemeStyles);
	}
	else {
		switchLocale('en');
		themeContext.set(undefined);
	}
}

const appProjector = ProjectorMixin(App);
const projector = new appProjector();
projector.setProperties({ changeTheme });

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
		projector.setProperties(assign({}, projector.properties, <any> {
			showDetails: '',
			activeFilter: 'all',
			activeView: 'list'
		}));
	}
});

mainRoute.append(todoViewRoute);
router.append(mainRoute);

setLocaleData().then(() => {
	if (projector.root) {
		projector.append();
		router.start();
	}
});

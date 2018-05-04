import has from '@dojo/has/has';
import global from '@dojo/shim/global';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Registry } from '@dojo/widget-core/Registry';
import { Store } from '@dojo/stores/Store';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';

import { App } from './App';
import { getTagsProcess } from './processes/tagProcesses';
import { setSessionProcess } from './processes/loginProcesses';
import { changeRouteProcess } from './processes/routeProcesses';
import { State } from './interfaces';
import { getRouteConfig } from './config';

const store = new Store<State>();
const registry = new Registry();

const router = registerRouterInjector(getRouteConfig(store), registry);

registry.define('editor', () => import('./containers/EditorContainer'));
registry.define('article', () => import('./containers/ArticleContainer'));
registry.define('login', () => import('./containers/LoginContainer'));
registry.define('register', () => import('./containers/RegisterContainer'));
registry.define('profile', () => import('./containers/ProfileContainer'));
registry.define('settings', () => import('./containers/SettingsContainer'));

let session;

if (!has('build-time-render')) {
	session = global.sessionStorage.getItem('conduit-session');
}

getTagsProcess(store)({});
if (session) {
	setSessionProcess(store)({ session: JSON.parse(session) });
}

router.on('nav', ({ outlet, context }: any) => {
	changeRouteProcess(store)({ outlet, context });
});

function onRouteChange() {
	const outlet = store.get(store.path('routing', 'outlet'));
	const params = store.get(store.path('routing', 'params'));
	if (outlet) {
		const link = router.link(outlet, params);
		if (link !== undefined) {
			router.setPath(link);
		}
	}
}

store.onChange(store.path('routing', 'outlet'), onRouteChange);
store.onChange(store.path('routing', 'params'), onRouteChange);

registry.defineInjector('state', () => () => store);

const appRoot = document.getElementById('app')!;
const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });
projector.merge(appRoot);

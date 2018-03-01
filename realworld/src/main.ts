import global from '@dojo/shim/global';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Registry } from '@dojo/widget-core/Registry';
import { Injector } from '@dojo/widget-core/Injector';
import { Store } from '@dojo/stores/Store';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';

import { App } from './App';
import { getTagsProcess } from './processes/tagProcesses';
import { setSessionProcess } from './processes/loginProcesses';
import { changeRouteProcess } from './processes/routeProcesses';
import { State } from './interfaces';
import { getRouteConfig } from './config';

class StoreInjector extends Injector {
	constructor(payload: Store<State>) {
		super(payload);
		payload.on('invalidate', () => {
			this.emit({ type: 'invalidate' });
		});
	}
}

const store = new Store<State>();
const registry = new Registry();

const router = registerRouterInjector(getRouteConfig(store), registry);

registry.define('editor', async () => {
	const module = await import('./containers/EditorContainer');
	return module.EditorContainer;
});
registry.define('article', async () => {
	const module = await import('./containers/ArticleContainer');
	return module.ArticleContainer;
});
registry.define('login', async () => {
	const module = await import('./containers/LoginContainer');
	return module.LoginContainer;
});
registry.define('register', async () => {
	const module = await import('./containers/RegisterContainer');
	return module.RegisterContainer;
});
registry.define('profile', async () => {
	const module = await import('./containers/ProfileContainer');
	return module.ProfileContainer;
});
registry.define('settings', async () => {
	const module = await import('./containers/SettingsContainer');
	return module.SettingsContainer;
});

const session = global.sessionStorage.getItem('conduit-session');

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

registry.defineInjector('state', new StoreInjector(store));

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });

projector.append();

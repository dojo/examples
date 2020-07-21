import has from '@dojo/framework/core/has';
import global from '@dojo/framework/shim/global';
import { createStoreMiddleware } from '@dojo/framework/core/middleware/store';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import { getTagsProcess } from './processes/tagProcesses';
import { setSessionProcess } from './processes/loginProcesses';
import { State } from './interfaces';
import Store from '@dojo/framework/stores/Store';
import config from './routes';
import Registry from '@dojo/framework/core/Registry';
import { changeRouteProcess } from './processes/routeProcesses';
import { replace } from '@dojo/framework/stores/state/operations';

export const registry = new Registry();
const router = registerRouterInjector(config, registry);

const store = createStoreMiddleware<State>((store: Store) => {
	let session: any;
	if (!has('build-time-render') && !has('test')) {
		session = global.sessionStorage.getItem('conduit-session');
	}
	if (session) {
		setSessionProcess(store)({ session: JSON.parse(session) });
	}
	getTagsProcess(store)({});
	store.apply([
		replace(store.path('settings'), {}),
		replace(store.path('feed'), {}),
		replace(store.path('profile'), {}),
		replace(store.path('routing'), {}),
		replace(store.path('login'), {}),
		replace(store.path('register'), {}),
		replace(store.path('editor'), {}),
		replace(store.path('article'), {})
	]);
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
});

export default store;

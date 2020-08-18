import injector from '@dojo/framework/core/middleware/injector';
import { create } from '@dojo/framework/core/vdom';
import Router from '@dojo/framework/routing/Router';
import { Params } from '@dojo/framework/routing/interfaces';

const factory = create({ injector });

const routerAccess = factory(function ({ middleware: { injector } }) {
	return (routerKey: string = 'router') => {
		const router = injector.get<Router>('router');

		if (!router) {
			throw new Error(`router not found with key ${routerKey}`);
		}

		return {
			router,
			go(to: string, params: Params) {
				const href = router.link(to, params);
				if (href) {
					router.setPath(href);
					return true;
				}
				return false;
			}
		};
	};
});

export default routerAccess;

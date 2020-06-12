import { renderer, tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import App from './App';

const registry = new Registry();
registerRouterInjector(
	[
		{
			id: 'filter',
			path: 'filter/{filter}',
			outlet: 'filter',
			defaultParams: { filter: 'all' },
			defaultRoute: true
		}
	],
	registry
);

const r = renderer(() => <App />);
r.mount({ registry });

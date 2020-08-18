import Registry from '@dojo/framework/core/Registry';
import renderer, { w } from '@dojo/framework/core/vdom';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import App from './App';
import routes from './routes';

const registry = new Registry();
registerRouterInjector(routes, registry);

const r = renderer(() => w(App, {}));
r.mount({ registry });

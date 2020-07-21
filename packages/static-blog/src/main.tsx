import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import StateHistory from '@dojo/framework/routing/history/StateHistory';

import App from './App';
// import the route configuration
import routes from './routes';

// set up an application registry and
// define the Dojo Router
const registry = new Registry();
registerRouterInjector(routes, registry, { HistoryManager: StateHistory });

const r = renderer(() => <App />);
r.mount({ registry });

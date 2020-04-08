import renderer, { tsx } from '@dojo/framework/core/vdom';
import { Registry } from '@dojo/framework/core/Registry';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import routes from './routes';
import App from './widgets/App';

const registry = new Registry();
registerRouterInjector(routes, registry);

const r = renderer(() => <App />);
r.mount({ registry });

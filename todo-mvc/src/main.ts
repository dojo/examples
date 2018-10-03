import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';
import TodoApp from './widgets/TodoApp';
import Registry from '@dojo/framework/widget-core/Registry';

const registry = new Registry();
const router = registerRouterInjector([
	{
		path: 'filter/{filter}',
		outlet: 'filter',
		defaultParams: { filter: 'all' },
		defaultRoute: true
	}
], registry);

const r = renderer(() => w(TodoApp, {}));
r.mount({ registry });

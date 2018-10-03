import Store from '@dojo/framework/stores/Store';
import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import Registry from '@dojo/framework/widget-core/Registry';
import { registerThemeInjector } from '@dojo/framework/widget-core/mixins/Themed';
import { registerRouterInjector } from '@dojo/framework/routing/RouterInjector';

import TodoAppContainer from './containers/TodoAppContainer';
import { initialStateProcess } from './todoProcesses';

const registry = new Registry();
const store = new Store();
const themeContext = registerThemeInjector(undefined, registry);

initialStateProcess(store)({});
registry.defineInjector('state', (invalidator) => {
	store.on('invalidate', () => invalidator());
	return () => store;
});
registry.defineInjector('theme-context', () => {
	return () => ({
		get: () => themeContext,
		set: (theme: string) => themeContext.set(theme)
	});
});

const config = [
	{
		path: 'view/{view}?{filter}',
		outlet: 'view',
		defaultParams: {
			filter: 'all',
			view: 'list'
		},
		defaultRoute: true,
		children: [
			{
				path: 'todo/{id}',
				outlet: 'edit'
			}
		]
	}
];
registerRouterInjector(config, registry);

const r = renderer(() => w(TodoAppContainer, {}));
r.mount({ registry });

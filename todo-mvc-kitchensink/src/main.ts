import Store from '@dojo/stores/Store';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { Registry } from '@dojo/widget-core/Registry';

import { TodoAppContainer } from './containers/TodoAppContainer';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themed';
import { initialStateProcess } from './todoProcesses';
import StoreInjector from './StoreInjector';
import Injector from '@dojo/widget-core/Injector';

const registry = new Registry();
const store = new Store();
const themeContext = registerThemeInjector(undefined, registry);

initialStateProcess(store)({});
registry.defineInjector('state', new StoreInjector(store));
registry.defineInjector('theme-context', new Injector(themeContext));

const Projector = ProjectorMixin(TodoAppContainer);
const projector = new Projector();

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

const router = registerRouterInjector(config, registry);
projector.setProperties({ registry });
projector.append();

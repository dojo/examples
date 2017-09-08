import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { BaseInjector, Injector } from '@dojo/widget-core/Injector';
import { WidgetRegistry } from '@dojo/widget-core/WidgetRegistry';

import setLocaleData from './setLocaleData';
import { TodoAppContext } from './TodoAppContext';
import { TodoAppContainer } from './containers/TodoAppContainer';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themeable';

const registry = new WidgetRegistry();
const themeContext = registerThemeInjector(undefined, registry);
registry.define('state', Injector(BaseInjector, new TodoAppContext(themeContext)));

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

// setting the registry should be promoted to defaultRegistry, however seems
// there is an issue used with Containers/Injectors
projector.setProperties({ defaultRegistry: registry } as any);

setLocaleData().then(() => {
	if (projector.root) {
		projector.append();
		router.start();
	}
});

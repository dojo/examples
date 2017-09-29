import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { Registry } from '@dojo/widget-core/Registry';

import setLocaleData from './setLocaleData';
import { TodoAppContext } from './TodoAppContext';
import { TodoAppContainer } from './containers/TodoAppContainer';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themeable';

const registry = new Registry();
const themeContext = registerThemeInjector(undefined, registry);
registry.defineInjector('state', new TodoAppContext(themeContext));

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

setLocaleData().then(() => {
	if (projector.root) {
		projector.append();
		router.start();
	}
});

import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { BaseInjector, Injector } from '@dojo/widget-core/Injector';
import { registry } from '@dojo/widget-core/d';

import setLocaleData from './setLocaleData';
import { TodoAppContext } from './TodoAppContext';
import { TodoAppContainer } from './containers/TodoAppContainer';

registry.define('state', Injector(BaseInjector, new TodoAppContext()));

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

const router = registerRouterInjector(config);

setLocaleData().then(() => {
	if (projector.root) {
		projector.append();
		router.start();
	}
});

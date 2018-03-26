import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import TodoApp from './widgets/TodoApp';
import Registry from '@dojo/widget-core/Registry';

const registry = new Registry();
const router = registerRouterInjector([
	{
		path: 'filter/{filter}',
		outlet: 'filter',
		defaultParams: { filter: 'all' },
		defaultRoute: true
	}
], registry);

const Projector = ProjectorMixin(TodoApp);
const projector = new Projector();
projector.setProperties({ registry });
projector.append();

import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import TodoApp from './widgets/TodoApp';
import { Outlet } from '@dojo/routing/Outlet';
import { Registry } from '@dojo/widget-core/Registry';

import TodoHeader from './widgets/TodoHeader';
import TodoList from './widgets/TodoList';
import TodoFooter from './widgets/TodoFooter';
import TodoFilter from './widgets/TodoFilter';
import TodoItem from './widgets/TodoItem';

const registry = new Registry();

function mapFilterRouteParam({ params }: any) {
	return { activeFilter: params.filter };
}

registry.define('todo-header', TodoHeader);
registry.define('todo-list', Outlet(TodoList, 'filter', mapFilterRouteParam));
registry.define('todo-item', TodoItem);
registry.define('todo-footer', TodoFooter);
registry.define('todo-filter', Outlet(TodoFilter, 'filter', mapFilterRouteParam));

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(TodoApp);
const projector = new Projector();

const router = registerRouterInjector([{ path: '{filter}', outlet: 'filter', defaultParams: { filter: 'all' }, defaultRoute: true }], registry);
projector.setProperties({ registry });

projector.append(root);
router.start();

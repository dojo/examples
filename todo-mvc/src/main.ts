import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import TodoApp from './widgets/TodoApp';
import { Outlet } from '@dojo/routing/Outlet';
import { WidgetRegistry } from '@dojo/widget-core/WidgetRegistry';

import TodoHeader from './widgets/TodoHeader';
import TodoList from './widgets/TodoList';
import TodoItem from './widgets/TodoItem';
import TodoFooter from './widgets/TodoFooter';
import TodoFilter from './widgets/TodoFilter';

const registry = new WidgetRegistry();

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
projector.__setProperties__({ registry });

projector.append(root);
router.start();

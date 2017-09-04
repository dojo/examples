import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { WidgetRegistry } from '@dojo/widget-core/WidgetRegistry';
import { BaseInjector, Injector } from '@dojo/widget-core/Injector';
import { TodoAppContainer } from './containers/TodoAppContainer';
import { Store } from 'le-store/store';
import { getTodosProcess } from './processes/todoProcesses';
import { successResponse } from 'le-store/command';
import { add } from 'le-store/state/operations';

import { createClient } from 'service-mocker/client';
import { TodoHeader } from './widgets/TodoHeader';
import { TodoListOutlet } from './outlets/TodoListOutlet';
import { TodoItem } from './widgets/TodoItem';
import { TodoFooterOutlet } from './outlets/TodoFooterOutlet';
import { TodoFilter } from './widgets/TodoFilter';

const root = document.querySelector('my-app') || undefined;

const config = [
	{
		path: '{filter}',
		outlet: 'filter',
		defaultParams: {
			filter: 'all'
		},
		defaultRoute: true
	}
];

function initialState() {
	return successResponse([
		add('/todos', []),
		add('/currentTodo', ''),
		add('/activeCount', 0),
		add('/completedCount', 0)
	], { undoable: false });
}

// load service worker
const scriptURL = require('sw-loader!./util/server');
const { ready } = createClient(scriptURL);
ready.then(() => {
	const store = new Store([ initialState ], getTodosProcess);
	const registry = new WidgetRegistry();

	registry.define('todo-header', TodoHeader);
	registry.define('todo-list', TodoListOutlet);
	registry.define('todo-item', TodoItem);
	registry.define('todo-footer', TodoFooterOutlet);
	registry.define('todo-filter', TodoFilter);
	registry.define('application-state', Injector(BaseInjector, store));

	const router = registerRouterInjector(config, registry);
	const Projector = ProjectorMixin(TodoAppContainer);
	const projector = new Projector();
	// default registry as there is an issue promoting registries
	// when using containers.
	projector.setProperties({ defaultRegistry: registry } as any);
	projector.append(root);
	router.start();
});

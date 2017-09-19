import global from '@dojo/shim/global';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Injector, Base as BaseInjector } from '@dojo/widget-core/Injector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';
import { WidgetRegistry } from '@dojo/widget-core/WidgetRegistry';

import { TodoAppContainer } from './containers/TodoAppContainer';
import { createStore, Store } from 'redux';
import { todoReducer } from './reducers';

const defaultState = {
	todos: [],
	currentTodo: '',
	activeCount: 0,
	completedCount: 0
};

const registry = new WidgetRegistry();

const store = createStore(todoReducer, defaultState, global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__());

export class ReduxInjector extends BaseInjector<Store<any>> {

	protected store: Store<any>;

	constructor(store: Store<any>) {
		super();
		this.store = store;
		this.store.subscribe(this.invalidate.bind(this));
	}

	public toInject(): Store<any> {
		return this.store;
	}
}

registry.define('application-state', Injector(ReduxInjector, store));

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

const router = registerRouterInjector(config, registry);
const Projector = ProjectorMixin(TodoAppContainer);
const projector = new Projector();
// bug in widget-core that doesn't correctly promote registry
// when using container with projector
projector.setProperties({ defaultRegistry: registry } as any);
projector.append();
router.start();

import global from '@dojo/shim/global';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { registry } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Injector } from '@dojo/widget-core/Injector';
import { registerRouterInjector } from '@dojo/routing/RouterInjector';

import { TodoAppContainer } from './containers/TodoAppContainer';
import { createStore, Store } from 'redux';
import { todoReducer } from './reducers';

const defaultState = {
	todos: [],
	currentTodo: '',
	activeCount: 0,
	completedCount: 0
};

const store = createStore(todoReducer, defaultState, global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__());

export class ReduxInjector extends WidgetBase {

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

registry.define('application-state', Injector(<any> ReduxInjector, <any> store));

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

const router = registerRouterInjector(config);
const Projector = ProjectorMixin(TodoAppContainer);
const projector = new Projector();
projector.append();
router.start();

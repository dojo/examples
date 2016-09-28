import { AnyAction } from 'dojo-actions/createAction';
import createApp from 'dojo-app/createApp';
import global from 'dojo-core/global';
import createRoute, { Route } from 'dojo-routing/createRoute';
import { Parameters } from 'dojo-routing/interfaces';
import createRouter from 'dojo-routing/createRouter';
import createHashHistory from 'dojo-routing/history/createHashHistory';
import ShimPromise from 'dojo-shim/Promise';
import createPanel from 'dojo-widgets/createPanel';
import createWidget from 'dojo-widgets/createWidget';

import * as storeTodoActions from './actions/storeTodoActions';
import * as uiTodoActions from './actions/uiTodoActions';
import * as widgetTodoActions from './actions/widgetTodoActions';
import createMemoryStore from 'dojo-stores/createMemoryStore';
import createCheckboxInput from './widgets/createCheckboxInput';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';
import createTodoList from './widgets/createTodoList';

const router = createRouter();

router.observeHistory(createHashHistory(), {}, true);

const completedRoute: Route<Parameters> = createRoute({
	path: '/completed',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'completed' });
	}
});

const allRoute: Route<Parameters> = createRoute({
	path: '/all',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'all' });
	}
});

const activeRoute: Route<Parameters> = createRoute({
	path: '/active',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'active' });
	}
});

router.append([allRoute, activeRoute, completedRoute]);

const todoStore = createMemoryStore({
	data: []
});

const widgetStore = createMemoryStore({
	data: [
		{
			id: 'title',
			label: 'todos'
		},
		{
			id: 'new-todo',
			classes: ['new-todo'],
			focused: true,
			placeholder: 'What needs to be done?'
		},
		{
			id: 'main-section',
			classes: ['main']
		},
		{
			id: 'todo-list',
			classes: ['todo-list'],
			children: []
		},
		{
			id: 'todo-toggle',
			classes: ['toggle-all'],
			checked: false
		},
		{
			id: 'todo-footer',
			classes: ['footer'],
			completedCount: 0,
			activeCount: 0,
			activeFilter: 'all'
		}
	]
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.registerStore('todo-store', todoStore);

Object.keys(storeTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> storeTodoActions)[actionName];
	action.configure(app.registryProvider);
});

Object.keys(uiTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> uiTodoActions)[actionName];
	if (actionName === 'filter') {
		// This action is referenced from the routes only, so does not need to be registered. Configure it instead.
		action.configure(app.registryProvider);
	}
	else {
		app.registerAction(actionName, action);
	}
});

Object.keys(widgetTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> widgetTodoActions)[actionName];
	action.configure({widgetStore, app});
});

todoStore.observe().subscribe((options: any) => {
	const { puts, deletes } = options;
	widgetTodoActions.updateHeaderAndFooter.do(options);

	if (deletes.length) {
		widgetTodoActions.deleteTodo.do(options);
	}

	if (puts.length) {
		widgetTodoActions.putTodo.do(options);
	}
});

app.loadDefinition({
	widgets: [
		{
			id: 'new-todo',
			factory: createFocusableTextInput,
			listeners: {
				keypress: 'todoInput'
			}
		},
		{
			id: 'main-section',
			factory: createPanel,
			options: {
				tagName: 'section'
			}
		},
		{
			id: 'todo-list',
			factory: createTodoList
		},
		{
			id: 'todo-toggle',
			factory: createCheckboxInput,
			listeners: {
				change: uiTodoActions.todoToggleAll
			}
		},
		{
			id: 'todo-footer',
			factory: createTodoFooter
		}
	],
	customElements: [
		{
			name: 'dojo-widget',
			factory: createWidget
		}
	]
});

// Try to use the native promise so the browser can report unhandled rejections.
const { /* tslint:disable */Promise/* tslint:enable */ = ShimPromise } = global;
Promise.resolve(app.realize(document.body));

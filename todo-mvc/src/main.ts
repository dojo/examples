import { AnyAction } from 'dojo-actions/createAction';
import createApp from 'dojo-app/createApp';
import global from 'dojo-core/global';
import ShimPromise from 'dojo-shim/Promise';

import * as storeTodoActions from './actions/storeTodoActions';
import * as widgetTodoActions from './actions/widgetTodoActions';
import createMemoryStore from 'dojo-stores/createMemoryStore';

import startRouter from './routes';

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

// Try to use the native promise so the browser can report unhandled rejections.
const { /* tslint:disable */Promise/* tslint:enable */ = ShimPromise } = global;
Promise.resolve(app.realize(document.body))
	.then(() => startRouter(app));

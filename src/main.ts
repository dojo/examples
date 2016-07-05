import createApp from 'dojo-app/createApp';
import { AnyAction } from 'dojo-actions/createAction';
import createRoute from 'dojo-routing/createRoute';
import createRouter from 'dojo-routing/createRouter';
import createHashHistory from 'dojo-routing/history/createHashHistory';
import createPanel from 'dojo-widgets/createPanel';
import createTextInput from 'dojo-widgets/createTextInput';
import createWidget from 'dojo-widgets/createWidget';
import createMemoryStore from './utils/createLocalMemoryStore';

import * as storeTodoActions from './actions/storeTodoActions';
import * as uiTodoActions from './actions/uiTodoActions';
import * as widgetTodoActions from './actions/widgetTodoActions';
import todoRegistryFactory from './registry/createTodoRegistry';
import createCheckboxInput from './widgets/createCheckboxInput';
import createTodoList from './widgets/createTodoList';
import createTodoFooter from './widgets/createTodoFooter';

const router = createRouter();
const history = createHashHistory();

history.on('change', (event) => {
	router.dispatch({}, event.value);
});

router.append(createRoute({
	path: '/completed',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'completed' });
	}
}));

router.append(createRoute({
	path: '/all',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'all' });
	}
}));

router.append(createRoute({
	path: '/active',
	exec (request) {
		uiTodoActions.filter.do({ 'filter': 'active' });
	}
}));

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

const app = createApp({ defaultStore: widgetStore });

app.registerStore('widget-store', widgetStore);
app.registerStore('todo-store', todoStore);

Object.keys(storeTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> storeTodoActions)[actionName];
	app.registerAction(actionName, action);
});

Object.keys(uiTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> uiTodoActions)[actionName];
	app.registerAction(actionName, action);
});

Object.keys(widgetTodoActions).forEach((actionName) => {
	const action: AnyAction = (<any> widgetTodoActions)[actionName];
	action.configure(widgetStore);
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
			factory: createTextInput,
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
			factory: createTodoList,
			options: {
				widgetRegistry: todoRegistryFactory({ widgetStore })
			}
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

app.realize(document.body);

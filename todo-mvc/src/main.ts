import createApp from 'dojo-app/createApp';
import global from 'dojo-core/global';
import ShimPromise from 'dojo-shim/Promise';
import createPanel from 'dojo-widgets/createPanel';
import createWidget from 'dojo-widgets/createWidget';

import { todoToggleAll, todoInput } from './actions/userActions';
import router from './router';
import todoStore, { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createCheckboxInput from './widgets/createCheckboxInput';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';
import createTodoItem from './widgets/createTodoItem';
import createTodoList from './widgets/createTodoList';

const app = createApp({
	defaultWidgetStore: widgetStore,
	router
});

app.registerStore('todo-store', todoStore);
app.loadDefinition({
	widgets: [
		{
			id: 'new-todo',
			factory: createFocusableTextInput,
			listeners: {
				keypress: todoInput
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
				change: todoToggleAll
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
		},
		{
			name: 'todo-item',
			factory: createTodoItem
		}
	]
});

// Try to use the native promise so the browser can report unhandled rejections.
const { /* tslint:disable */Promise/* tslint:enable */ = ShimPromise } = global;
Promise.resolve(app.start({
	afterCreate() {
		bindTodoStoreActions();
	},
	root: document.body
}));

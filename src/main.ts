import createApp from 'dojo-app/createApp';
import { AnyAction } from 'dojo-actions/createAction';
import createPanel from 'dojo-widgets/createPanel';
import createTextInput from 'dojo-widgets/createTextInput';
import createWidget from 'dojo-widgets/createWidget';
import createMemoryStore from './utils/createLocalMemoryStore';

import * as storeTodoActions from './actions/storeTodoActions';
import * as uiTodoActions from './actions/uiTodoActions';
import todoRegistryFactory from './registry/createTodoRegistry';
import createTodoList from './widgets/createTodoList';
import createTodoFooter from './widgets/createTodoFooter';

const todoStore = createMemoryStore({
	data: [
		{id: 'todo1', label: 'My First Todo!', completed: false}
	]
});

const widgetStore = createMemoryStore({
	data: [
		{id: 'title', label: 'todos'},
		{id: 'new-todo', classes: ['new-todo'], placeholder: 'What needs to be done?'},
		{id: 'main-section', classes: ['main']},
		{id: 'todo-list', classes: ['todo-list'], children: []},
		{id: 'todo-footer', classes: ['footer'], completedCount: 0, activeCount: 0}
	]
});

todoStore.observe().subscribe((options: any) => {
	todoStore.get().then((items: any) => {
		const todos: any = [...Array.from(items)];
		const completedCount = todos.filter((todo: any) => todo.completed).length;
		const activeCount = todos.filter((todo: any) => !todo.completed).length;
		widgetStore.patch({id: 'todo-footer', completedCount, activeCount});
	});
});

todoStore.observe().subscribe((options: any) => {
	const { deleted, item } = options;
	if (deleted) {
		widgetStore.get('todo-list').then((todoList: any) => {
			const children = todoList.children.filter((id: string) => id !== item);
			return widgetStore.delete(item).patch({id: todoList.id, children});
		});
	} else {
		widgetStore.get('todo-list').then((todoList: any) => {
			const { id, children } = todoList;
			function put() {
				return widgetStore
					.put(item)
					.patch({id, children: [...children, item.id]});
			}

			function patch() {
				return widgetStore
					.patch(item)
					.patch({id, children});
			}

			return children.includes(item.id) ? patch() : put();
		});
	}
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


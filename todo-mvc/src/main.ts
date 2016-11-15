import createApp from 'dojo-app/createApp';
import createPanel from 'dojo-widgets/createPanel';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import { todoToggleAll, todoInput } from './actions/userActions';
import router from './routes';
import todoStore, { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createCheckboxInput from './widgets/createCheckboxInput';
import createFocusableTextInput from './widgets/createFocusableTextInput';
import createTodoFooter from './widgets/createTodoFooter';
import createTodoItem from './widgets/createTodoItem';
import createTodoList from './widgets/createTodoList';
import { Widget, WidgetState } from 'dojo-interfaces/widgetBases';
import { VNodeProperties } from 'dojo-interfaces/vdom';

const app = createApp({ defaultWidgetStore: widgetStore });

const createTitle = createWidgetBase.extend({
	tagName: 'h1',
	nodeAttributes: [
		function (this: Widget<WidgetState & { label: string }>): VNodeProperties {
			return { innerHTML: this.state.label };
		}
	]
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
			name: 'todo-title',
			factory: createTitle
		},
		{
			name: 'todo-item',
			factory: createTodoItem
		}
	]
});
Promise.resolve(app.realize(document.body))
	.then(() => bindTodoStoreActions())
	.then(() => router.start());

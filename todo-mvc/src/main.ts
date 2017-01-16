import router from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createApp from './createApp';

const root = document.getElementsByTagName('my-app')[0];

const app = createApp({
	properties: {
		id: 'todo-app',
		externalState: widgetStore
	},
	root
});

app.append()
	.then(() => bindTodoStoreActions())
	.then(() => router.start());

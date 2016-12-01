import router from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createApp from './app';

const root = document.querySelector('my-app');

const app = createApp({
	id: 'todo-app',
	root,
	stateFrom: widgetStore
});

app.append()
	.then(() => bindTodoStoreActions())
	.then(() => router.start());

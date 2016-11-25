import router from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import createApp from './app';

const root = document.getElementsByTagName('my-app')[0];

const app = createApp({
	id: 'app',
	root,
	stateFrom: widgetStore
});

app.attach()
	.then(() => bindTodoStoreActions())
	.then(() => router.start());

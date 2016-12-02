import router from './routes';
import { bindActions as bindCardStoreActions } from './stores/cardStore';
import widgetStore from './stores/widgetStore';
import createApp from './app';
import 'maquette/src/css-transitions';

const root = document.getElementsByTagName('my-app')[0];

const app = createApp({
	id: 'app',
	stateFrom: widgetStore,
	root,
	cssTransitions: true
});

app.append()
	.then(() => bindCardStoreActions())
	.then(() => router.start());

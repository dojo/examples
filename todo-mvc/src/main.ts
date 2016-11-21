import router from './routes';
import { bindActions as bindTodoStoreActions } from './stores/todoStore';
import widgetStore from './stores/widgetStore';
import { createProjector } from 'dojo-widgets/projector';

import createApp from './app';

const app = createApp({
	id: 'app',
	stateFrom: widgetStore
});

const root = document.getElementsByTagName('my-app')[0];
const projector = createProjector({ root });

projector.append(app);
projector.attach()
	.then(() => bindTodoStoreActions())
	.then(() => router.start());

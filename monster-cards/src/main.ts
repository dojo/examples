import createApp from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';

import createNavbar from './widgets//navbar/createNavbar';

const widgetStore = createMemoryStore({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		}
	]
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.loadDefinition({
	widgets: [
		{
			id: 'navbar',
			factory: createNavbar
		}
	]
});

app.realize(document.body);

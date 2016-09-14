import createApp from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';

import createNavbar from './widgets/navbar/createNavbar';
import createFooter from './widgets/footer/createFooter';

const widgetStore = createMemoryStore({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		},
		{
			id: 'footer',
			classes: [ 'footer' ]
		}
	]
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.loadDefinition({
	widgets: [
		{
			id: 'navbar',
			factory: createNavbar
		},
		{
			id: 'footer',
			factory: createFooter
		}
	]
});

app.realize(document.body);

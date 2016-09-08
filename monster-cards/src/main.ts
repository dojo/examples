import createApp from 'dojo-app/createApp';
import createWidget from 'dojo-widgets/createWidget';
import createMemoryStore from 'dojo-stores/createMemoryStore';

const widgetStore = createMemoryStore({
	data: [
		{
			id: 'header-1',
			label: 'Header1'
		},
		{
			id: 'main-1',
			label: 'Main1'
		},
		{
			id: 'footer-1',
			label: 'Footer1'
		}
	]
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.loadDefinition({
	customElements: [
		{
			name: 'dojo-widget',
			factory: createWidget
		}
	]
});

app.realize(document.body);

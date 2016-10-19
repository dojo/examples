import createApp from 'dojo-app/createApp';

import startRouter from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription from './widgets/cardDetails/createCardDescription';
import createContainer from './widgets/common/createContainer';
import createCard from './widgets/card/createCard';
import defaultWidgetStore from './stores/widgetStore';

const app = createApp({ defaultWidgetStore });

app.registerStore('cards-store', cardStore);
app.loadDefinition({
	customElements: [
		{
			name: 'milestone-card',
			factory: createCard
		},
		{
			name: 'card-description',
			factory: createCardDescription
		}
	],
	widgets: [
		{
			id: 'navbar',
			factory: createNavbar
		},
		{
			id: 'container',
			factory: createContainer
		},
		{
			id: 'cardDetails',
			factory: createContainer,
			options: {
				tagName: 'card-details'
			}
		},
		{
			id: 'cardDetailsNavbar',
			factory: createContainer,
			options: {
				tagName: 'card-details-nav-bar'
			}
		},
		{
			id: 'cardDetailsJumbotron',
			factory: createContainer
		}
	]
});

Promise.resolve(app.realize(document.body))
	.then(() => bindCardStoreActions())
	.then(() => startRouter())
	.then(() => {
		for (let i = 0; i < 10; i++) {
			const id = `card-${i}`;
			cardStore.put({
				id,
				name: `The Horde id: ${id}`,
				tagline: 'Throw more bodies at the problem',
				description: 'Your milestone\'s slipping? No worries, your boss has a great idea',
				cardImage: 'images/horde.png',
				favouriteCount: 4332
			});
		}
	});

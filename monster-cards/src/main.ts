import createApp from 'dojo-app/createApp';

import startRouter from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription from './widgets/cardDetails/createCardDescription';
import createContainer from './widgets/common/createContainer';
import createCard from './widgets/card/createCard';
import createCardSummary from './widgets/card/createCardSummary';
// import createCardsList from './widgets/cards/createCardsList';
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
		},
		{
			name: 'milestone-card-summary',
			factory: createCardSummary
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
		},
		{
			id: 'cards',
			factory: createContainer
		},
		{
			id: 'cardsJumbotron',
			factory: createContainer
		},
		{
			id: 'cardsList',
			factory: createContainer
		}
	]
});

Promise.resolve(app.realize(document.body))
	.then(() => bindCardStoreActions())
	.then(() => startRouter());

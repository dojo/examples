import createApp from 'dojo-app/createApp';

import router from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription from './widgets/card-details/createCardDescription';
import createContainer from './widgets/common/createContainer';
import createCard from './widgets/card/createCard';
import createImage from './widgets/common/createImage';
import createCardSummary from './widgets/card/createCardSummary';
import defaultWidgetStore from './stores/widgetStore';

import createWidget from 'dojo-widgets/createWidget';

import 'maquette/src/css-transitions';

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
		},
		{
			id: 'home',
			factory: createContainer
		},
		{
			id: 'homeJumbotron',
			factory: createContainer
		},
		{
			id: 'homePageLogo',
			factory: createImage
		},
		{
			id: 'gameplay',
			factory: createContainer
		},
		{
			id: 'gameplayJumbotron',
			factory: createContainer
		},
		{
			id: 'gameplayHeading',
			factory: createWidget,
			options: {
				tagName: 'h1'
			}
		},
		{
			id: 'about',
			factory: createContainer
		},
		{
			id: 'aboutJumbotron',
			factory: createContainer
		},
		{
			id: 'aboutHeading',
			factory: createWidget,
			options: {
				tagName: 'h1'
			}
		}
	]
});

Promise.resolve(app.realize(document.body))
	.then(() => bindCardStoreActions())
	.then(() => router.start());

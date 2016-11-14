import createApp from 'dojo-app/createApp';

import router from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription from './widgets/card-details/createCardDescription';
import createCardNavBar from './widgets/card-details/createCardNavBar';
import createContainer from './widgets/common/createContainer';
import createHomePage from './widgets/home/createHomePage';
import createGameplayPage from './widgets/gameplay/createGameplayPage';
import createAboutPage from './widgets/about/createAboutPage';
import createCardsPage from './widgets/cards/createCardsPage';
import defaultWidgetStore from './stores/widgetStore';

import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';

import 'maquette/src/css-transitions';

const app = createApp({ defaultWidgetStore });
const createAnimatedContainer = createContainer.mixin(createCssTransitionMixin);

app.registerStore('cards-store', cardStore);
app.loadDefinition({
	customElements: [
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
			factory: createContainer,
			options: {
				tagName: 'main'
			}
		},
		{
			id: 'cardDetails',
			factory: createAnimatedContainer,
			options: {
				tagName: 'card-details'
			}
		},
		{
			id: 'cardDetailsNavbar',
			factory: createCardNavBar
		},
		{
			id: 'cardDetailsJumbotron',
			factory: createContainer
		},
		{
			id: 'cards',
			factory: createCardsPage
		},
		{
			id: 'home',
			factory: createHomePage
		},
		{
			id: 'gameplay',
			factory: createGameplayPage
		},
		{
			id: 'about',
			factory: createAboutPage
		}
	]
});

Promise.resolve(app.realize(document.body))
	.then(() => bindCardStoreActions())
	.then(() => router.start());

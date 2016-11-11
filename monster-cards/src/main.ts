import createApp from 'dojo-app/createApp';

import router from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription from './widgets/card-details/createCardDescription';
import createContainer from './widgets/common/createContainer';
import createImage from './widgets/common/createImage';
import createCard from './widgets/card/createCard';
import createCardSummary from './widgets/card/createCardSummary';
import defaultWidgetStore from './stores/widgetStore';

import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createWidget from 'dojo-widgets/createWidget';

import 'maquette/src/css-transitions';

const app = createApp({ defaultWidgetStore });
const createAnimatedContainer = createContainer.mixin(createCssTransitionMixin);

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
			factory: createAnimatedContainer,
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
			factory: createAnimatedContainer
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
			factory: createAnimatedContainer
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
			factory: createAnimatedContainer
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
			factory: createAnimatedContainer
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

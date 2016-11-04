import createApp from 'dojo-app/createApp';

import router from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';
import favStore, { bindActions as bindFavStoreActions } from './stores/favoriteCardStore';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';

import createCardDescription from './widgets/card-details/createCardDescription';
import createContainer from './widgets/common/createContainer';
import createSearchInput from './widgets/common/createSearchInput';
import createIcon from './widgets/common/createIcon';
import createNavMenu from './widgets/navbar/createNavMenu';
import createCard from './widgets/card/createCard';
import createImage from './widgets/common/createImage';
import createCardSummary from './widgets/card/createCardSummary';
import createCardFavorite from './widgets/card/createCardFavorite';
import defaultWidgetStore from './stores/widgetStore';
import { showFavorites, hideFavorites } from './actions/userActions';

import createWidget from 'dojo-widgets/createWidget';

import 'maquette/src/css-transitions';

const app = createApp({ defaultWidgetStore });

app.registerStore('cards-store', cardStore);
app.registerStore('fav-store', favStore);
app.loadDefinition({
	customElements: [
		{
			name: 'milestone-card',
			factory: createCard
		},
		{
			name: 'fav-card',
			factory: createCardFavorite
		},
		{
			name: 'card-description',
			factory: createCardDescription
		},
		{
			name: 'milestone-card-summary',
			factory: createCardSummary
		},
		{
			name: 'fav-milestone-card',
			factory: createCardSummary
		}
	],
	widgets: [
		{
			id: 'navbar',
			factory: createContainer,
			options: {
				tagName: 'header'
			}
		},
		{
			id: 'navbar-menu',
			factory: createNavMenu
		},
		{
			id: 'navbar-actions',
			factory: createContainer,
			options: {
				tagName: 'ul'
			}
		},
		{
			id: 'navbar-search',
			factory: createSearchInput
		},
		{
			id: 'navbar-favorites',
			factory: createContainer.mixin(createVNodeEvented),
			options: {
				tagName: 'li'
			},
			listeners: {
				mouseover: () => { showFavorites.do(); },
				mouseout: () => { hideFavorites.do(); }
			}
		},
		{
			id: 'navbar-fav-icon',
			factory: createIcon.mixin(createVNodeEvented)
		},
		{
			id: 'navbar-fav-cards',
			factory: createContainer.mixin(createCssTransitionMixin),
			options: {
				tagName: 'ul'
			}
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
	.then(() => bindFavStoreActions())
	.then(() => router.start());

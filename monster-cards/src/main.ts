import createApp from 'dojo-app/createApp';

import router from './routes';
import cardStore, { bindActions as bindCardStoreActions } from './stores/cardStore';

import createNavbar from './widgets/navbar/createNavbar';
import createContainer from './widgets/common/createContainer';
import createHomePage from './widgets/home/createHomePage';
import createGameplayPage from './widgets/gameplay/createGameplayPage';
import createAboutPage from './widgets/about/createAboutPage';
import createCardsPage from './widgets/cards/createCardsPage';
import createCardDetailsPage from './widgets/card-details/createCardDetailsPage';
import defaultWidgetStore from './stores/widgetStore';

import 'maquette/src/css-transitions';
import * as css from './widgets/common/general.module.styl';

const app = createApp({ defaultWidgetStore });

app.registerStore('cards-store', cardStore);
app.loadDefinition({
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
			factory: createCardDetailsPage
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

document.querySelector('html').classList.add(css.page);
document.body.classList.add(css.page);

Promise.resolve(app.realize(document.body))
	.then(() => bindCardStoreActions())
	.then(() => router.start());

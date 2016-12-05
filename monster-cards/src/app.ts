import { ComposeFactory } from 'dojo-compose/compose';
import { DNode, Widget, WidgetOptions, WidgetState } from 'dojo-widgets/interfaces';
import d from 'dojo-widgets/d';
import createProjector, { Projector, ProjectorOptions } from 'dojo-widgets/createProjector';

import createNavbar from './widgets/navbar/createNavbar';
import createHomePage from './widgets/home/createHomePage';
import createCardDetailsPage from './widgets/card-details/createCardDetailsPage';
import createCardsPage from './widgets/cards/createCardsPage';
import createGameplayPage from './widgets/gameplay/createGameplayPage';
import createAboutPage from './widgets/about/createAboutPage';

interface AppState extends WidgetState {
	route?: string;
}

type App = Widget<AppState> & Projector;

interface AppFactory extends ComposeFactory<App, ProjectorOptions> {}

let previousRouteDNode: DNode;

function getPageFromRoute(instance: App) {
	const { state } = instance;
	let routeDNode: DNode;
	const options: WidgetOptions<WidgetState> = {
		id: state.route,
		stateFrom: instance.stateFrom
	};

	switch (state.route) {
		case 'home':
			routeDNode = d(createHomePage, options);
			break;
		case 'cards':
			routeDNode = d(createCardsPage, options);
			break;
		case 'cardDetails':
			routeDNode = d(createCardDetailsPage, options);
			break;
		case 'gameplay':
			routeDNode = d(createGameplayPage, options);
			break;
		case 'about':
			routeDNode = d(createAboutPage, options);
			break;
		default:
			if (previousRouteDNode) {
				routeDNode = previousRouteDNode;
			}
			else {
				routeDNode = d(createHomePage, options);
			}
	}
	previousRouteDNode = routeDNode;
	return routeDNode;
}

const createApp: AppFactory = createProjector.mixin({
	mixin: {
		getChildrenNodes: function(this: App): DNode[] {
			const { stateFrom } = this;
			if (this.state.route) {
				return [
					d(createNavbar, <WidgetOptions<WidgetState>> { id: 'navbar', stateFrom }),
					getPageFromRoute(this)
				];
			}
			return [];
		},
		tagName: 'main'
	}
});

export default createApp;

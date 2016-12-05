import { DNode, WidgetOptions, WidgetState } from 'dojo-widgets/interfaces';
import d from 'dojo-widgets/d';
import createProjector, { Projector } from 'dojo-widgets/createProjector';

import createNavbar from './widgets/navbar/createNavbar';
import createHomePage from './widgets/home/createHomePage';
import createCardDetailsPage from './widgets/card-details/createCardDetailsPage';
import createCardsPage from './widgets/cards/createCardsPage';
import createGameplayPage from './widgets/gameplay/createGameplayPage';
import createAboutPage from './widgets/about/createAboutPage';

let previousRoute: DNode;

function getPageFromRoute(instance: Projector) {
	const { state }: { state: any } = instance;
	let route: DNode;
	const options: WidgetOptions<WidgetState> = {
		id: state.route,
		stateFrom: instance.stateFrom
	};

	switch (state.route) {
		case 'home':
			route = d(createHomePage, options);
			break;
		case 'cards':
			route = d(createCardsPage, options);
			break;
		case 'cardDetails':
			route = d(createCardDetailsPage, options);
			break;
		case 'gameplay':
			route = d(createGameplayPage, options);
			break;
		case 'about':
			route = d(createAboutPage, options);
			break;
		default:
			if (previousRoute) {
				route = previousRoute;
			}
			else {
				route = d(createHomePage, options);
			}
	}
	previousRoute = route;
	return route;
}

const createApp = createProjector.mixin({
	mixin: {
		getChildrenNodes: function(this: Projector): DNode[] {
			const { stateFrom } = this;
			if ((<any> this.state).route) {
				return [
					d(createNavbar, <any> { id: 'navbar', stateFrom }),
					getPageFromRoute(this)
				];
			}
			return [];
		},
		tagName: 'main'
	}
});

export default createApp;

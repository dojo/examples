import { DNode, WidgetOptions, WidgetState } from 'dojo-interfaces/widgetBases';
import d from 'dojo-widgets/util/d';
import createProjector, { Projector } from 'dojo-widgets/createProjector';

import createNavbar from './widgets/navbar/createNavbar';
import createHomePage from './widgets/home/createHomePage';
import createCardDetailsPage from './widgets/card-details/createCardDetailsPage';
import createCardsPage from './widgets/cards/createCardsPage';
import createGameplayPage from './widgets/gameplay/createGameplayPage';
import createAboutPage from './widgets/about/createAboutPage';

function getPageRoute(instance: any) {
	let route: any;
	const options: WidgetOptions<WidgetState> = {
		id: instance.state.route,
		stateFrom: instance.stateFrom
	};

	switch (instance.state.route) {
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
	}
	return route;
}

const createApp = createProjector.mixin({
	mixin: {
		getChildrenNodes: function(this: Projector): DNode[] {
			const { stateFrom } = this;
			if ((<any> this.state).route) {
				return [
					d(createNavbar, <any> { id: 'navbar', stateFrom }),
					getPageRoute(this)
				];
			}
			return [];
		},
		tagName: 'main'
	}
});

export default createApp;

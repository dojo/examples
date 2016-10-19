import createApp from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';
import createContainer from './widgets/common/createContainer';

import createRoute, { Route } from 'dojo-routing/createRoute';
import { Parameters } from 'dojo-routing/interfaces';
import createRouter from 'dojo-routing/createRouter';
import createHashHistory from 'dojo-routing/history/createHashHistory';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription, { MilestoneCardDetails } from './widgets/cardDetails/createCardDescription';
import createCard from './widgets/card/createCard';

import { assign } from 'dojo-core/lang';

const router = createRouter();
router.observeHistory(createHashHistory(), {}, true);

const widgetStore = createMemoryStore <any>({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		},
		{
			id: 'container',
			children: []
		},
		{
			id: 'cardDetails',
			children: [
				'cardDetailsNavbar',
				'cardDetailsJumbotron'
			]
		},
		{
			id: 'cardDetailsNavbar',
			children: []
		},
		{
			id: 'cardDetailsJumbotron',
			classes: [ 'jumbotron' ]
		}
	]
});

const cards: MilestoneCardDetails[] = [];
const cardStore = createMemoryStore({
	data: cards
});
const cardIdToDescriptionIdMap = new Map();

cardStore.observe().subscribe(function(options: any) {
	const { puts, beforeAll } = options;
	puts.forEach((item: any) => {
		const cardId = item.id;
		const descriptionId = `description-${cardId}`;
		cardIdToDescriptionIdMap.set(cardId, descriptionId);

		Promise.all([
			widgetStore.put(assign({}, item, { type: 'milestone-card' })),
			widgetStore.put(assign({}, item, { type: 'card-description', id: descriptionId }))
		]).then(() => {
			widgetStore.patch({
				id: 'cardDetailsNavbar',
				children: [ ...beforeAll.map((item: any) => item.id), item.id ] });
		});
	});
});

// make some cards
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

const cardDetailRoute: Route<Parameters> = createRoute({
	path: 'cards/{id}',
	exec (request: any) {
		const id = request.params.id;
		const descriptionId = cardIdToDescriptionIdMap.get(id);

		// setTimeout(() => {
		widgetStore
			.patch({ id: 'cardDetailsJumbotron', children: [ descriptionId ] })
			.patch({ id: 'container', children: [ 'cardDetails' ] });
		// }, 1000);

	}
});

router.append([ cardDetailRoute ]);

const app = createApp({ defaultWidgetStore: widgetStore });

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

app.realize(document.body);

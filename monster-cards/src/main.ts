import createApp from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';
import createContainer from './widgets/common/createContainer';

import createNavbar from './widgets/navbar/createNavbar';
import createCardDescription, { MilestoneCardDetails } from './widgets/cardDetails/createCardDescription';
import createCard from './widgets/card/createCard';
import ShimPromise from 'dojo-shim/Promise';
import global from 'dojo-core/global';

import { assign } from 'dojo-core/lang';

const widgetStore = createMemoryStore <any>({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		},
		{
			id: 'container',
			children: [ 'cardDetails' ]
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
			classes: [ 'jumbotron' ],
			children: [ 'cardDetailsDescription' ]
		},
		{
			id: 'cardDetailsDescription'
		}
	]
});

const cards: MilestoneCardDetails[] = [];
const cardStore = createMemoryStore({
	data: cards
});

cardStore.observe().subscribe(function(options: any) {
	const { puts, beforeAll } = options;
	puts.forEach((item: any) => {
		widgetStore
			.put(assign({}, item, { type: 'milestone-card'}))
			.patch({ id: 'cardDetailsNavbar', children: [ ...beforeAll.map((item: any) => item.id), item.id ] });
	});
});

// make some cards
for (let i = 0; i < 10; i++) {
	cardStore.put({
		id: `card-${i}`,
		name: 'The Horde',
		tagline: 'Throw more bodies at the problem',
		description: 'Your milestone\'s slipping? No worries, your boss has a great idea',
		cardImage: 'images/horde.png',
		favouriteCount: 4332
	});
}

cardStore.get('card-1').then((details) => {
	widgetStore.patch({ id: 'cardDetailsDescription', details });
});

const app = createApp({ defaultWidgetStore: widgetStore });

app.loadDefinition({
	customElements: [
		{
			name: 'milestone-card',
			factory: createCard
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
			id: 'cardDetailsDescription',
			factory: createCardDescription
		}
	]
});

const { /* tslint:disable */Promise/* tslint:enable */ = ShimPromise } = global;
Promise.resolve(app.realize(document.body));

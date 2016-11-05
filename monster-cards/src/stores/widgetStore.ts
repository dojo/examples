import createStore from 'dojo-stores/store/createStore';
import createObservableStoreMixin from 'dojo-stores/store/mixins/createObservableStoreMixin';

export default createStore.mixin(createObservableStoreMixin())({
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
			classes: [ 'jumbotron', 'cardDetailsJumbotron' ]
		},
		{
			id: 'cards',
			classes: [ 'cards' ],
			children: [
				'cardsJumbotron',
				'cardsList'
			]
		},
		{
			id: 'cardsList',
			classes: [ 'cardsList' ]
		},
		{
			id: 'cardsJumbotron',
			classes: [ 'jumbotron', 'cardsJumbotron' ]
		},
		{
			id: 'home',
			children: [ 'homeJumbotron' ]
		},
		{
			id: 'homeJumbotron',
			classes: [ 'jumbotron', 'homeJumbotron' ],
			children: [ 'homePageLogo' ]
		},
		{
			id: 'homePageLogo',
			src: './images/mm_logo.png'
		},
		{
			id: 'about',
			children: [ 'aboutJumbotron' ]
		},
		{
			id: 'aboutJumbotron',
			classes: [ 'jumbotron', 'aboutJumbotron' ],
			children: [ 'aboutHeading' ]
		},
		{
			id: 'aboutHeading',
			label: 'About'
		},
		{
			id: 'gameplay',
			children: [ 'gameplayJumbotron' ]
		},
		{
			id: 'gameplayJumbotron',
			classes: [ 'jumbotron', 'gameplayJumbotron' ],
			children: [ 'gameplayHeading' ]
		},
		{
			id: 'gameplayHeading',
			label: 'Gameplay'
		}
	]
});

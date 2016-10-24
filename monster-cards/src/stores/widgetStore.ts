import createMemoryStore from 'dojo-stores/createMemoryStore';

export default createMemoryStore<any>({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ]
		},
		{
			id: 'navbar-menu',
			classes: [ 'inline-list' ]
		},
		{
			id: 'navbar-actions',
			classes: [ 'inline-list', 'pull-right' ]
		},
		{
			id: 'navbar-search',
			classes: [ 'search' ]
		},
		{
			id: 'navbar-favorites'
		},
		{
			id: 'navbar-fav-icon',
			classes: [ 'fa', 'fa-2x', 'fa-heart-o' ]
		},
		{
			id: 'navbar-fav-cards',
			classes: [ 'cardFavoriteContainer', 'animated' ],
			enterAnimation: 'rollIn',
			exitAnimation: 'rollOut'
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

import createMemoryStore from 'dojo-stores/createMemoryStore';

export default createMemoryStore<any>({
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
			classes: [ 'animated', 'cardDetails', 'pageHolder' ],
			children: [
				'cardDetailsNavbar',
				'cardDetailsJumbotron',
				'cardDetailsSeenWith'
			],
			enterAnimation: 'fadeInSlideDown',
			exitAnimation: 'fadeOutSlideUp'
		},
		{
			id: 'cardDetailsNavbar',
			classes: [ 'animated' ],
			children: [],
			enterAnimation: 'slideInDown',
			exitAnimation: 'slideOutUp'
		},
		{
			id: 'cardDetailsJumbotron',
			classes: [ 'jumbotron', 'cardDetailsJumbotron' ]
		},
		{
			id: 'cardDetailsSeenWith',
			classes: [ 'cardDetailsSeenWith' ],
			children: [
				'cardDetailsSeenWithCard1',
				'cardDetailsSeenWithCard2'
			]
		},
		{
			id: 'cardDetailsSeenWithCard1',
			classes: [ 'cardDetailsSeenWithCard' ]
		},
		{
			id: 'cardDetailsSeenWithCard2',
			classes: [ 'cardDetailsSeenWithCard' ]
		},
		{
			id: 'cards',
			classes: [ 'animated', 'cards', 'pageHolder' ],
			children: [
				'cardsJumbotron',
				'cardsList'
			],
			enterAnimation: 'fadeIn'
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
			classes: [ 'animated', 'pageHolder' ],
			children: [ 'homeJumbotron' ],
			enterAnimation: 'fadeIn'
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
			classes: [ 'animated', 'pageHolder' ],
			children: [ 'aboutJumbotron' ],
			enterAnimation: 'fadeIn'
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
			classes: [ 'animated', 'pageHolder' ],
			children: [ 'gameplayJumbotron' ],
			enterAnimation: 'fadeIn'
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

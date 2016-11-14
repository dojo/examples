import createMemoryStore from 'dojo-stores/createMemoryStore';

export default createMemoryStore<any>({
	data: [
		{
			id: 'navbar',
			classes: [ 'navbar' ],
			sections: [
				{ text: 'the cards', href: '#cards' },
				{ text: 'gameplay', href: '#gameplay' },
				{ text: 'about', href: '#about' }
			]
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
				'cardDetailsJumbotron'
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
			id: 'cards',
			classes: [ 'animated', 'cards', 'pageHolder' ],
			children: [
				'cardsJumbotron',
				'cardsList'
			],
			enterAnimation: 'fadeIn'
		},
		{
			id: 'cardsList'
		},
		{
			id: 'cardsJumbotron',
			classes: [ 'jumbotron', 'cardsJumbotron' ]
		},
		{
			id: 'home',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		},
		{
			id: 'about',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		},
		{
			id: 'gameplay',
			enterAnimation: 'fadeIn',
			exitAnimation: 'fadeOut'
		}
	]
});

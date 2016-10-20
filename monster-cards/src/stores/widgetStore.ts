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

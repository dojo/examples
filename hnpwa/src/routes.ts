export default [
	{
		id: 'content',
		path: '/{category}/{page}',
		outlet: 'content',
		defaultRoute: true,
		defaultParams: {
			category: 'top',
			page: '1'
		}
	},
	{
		id: 'comments',
		path: '/comments/{id}',
		outlet: 'comments'
	}
];

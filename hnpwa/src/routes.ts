export default [
	{
		path: '/{category}/{page}',
		outlet: 'content',
		defaultRoute: true,
		defaultParams: {
			category: 'top',
			page: '1'
		}
	},
	{
		path: '/comments/{id}',
		outlet: 'comments'
	}
];

export default [
	{
		id: 'blog-list',
		path: '/',
		outlet: 'blog-list',
		defaultRoute: true
	},
	{
		id: 'blog',
		path: 'blog/{blog}',
		outlet: 'blog'
	}
];

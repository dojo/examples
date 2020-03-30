export default [
	{
		path: '/',
		outlet: 'blog-list',
		defaultRoute: true
	},
	{
		path: 'blog/{blog}',
		outlet: 'blog'
	}
];

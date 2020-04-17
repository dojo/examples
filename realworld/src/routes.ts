export default [
	{
		id: 'login',
		path: 'login',
		outlet: 'login'
	},
	{
		id: 'register',
		path: 'register',
		outlet: 'register'
	},
	{
		id: 'user',
		path: 'user/{username}',
		outlet: 'user'
	},
	{
		id: 'favorites',
		path: 'user/{username}/favorites',
		outlet: 'favorites'
	},
	{
		id: 'article',
		path: 'article/{slug}',
		outlet: 'article'
	},
	{
		id: 'settings',
		path: 'settings',
		outlet: 'settings'
	},
	{
		id: 'new-post',
		path: 'editor',
		outlet: 'new-post',
		children: [
			{
				id: 'edit-post',
				path: 'editor/{slug}',
				outlet: 'edit-post'
			}
		]
	},
	{
		id: 'home',
		path: 'home',
		outlet: 'home',
		defaultRoute: true
	}
];

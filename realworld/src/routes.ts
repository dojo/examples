export default [
	{
		path: "login",
		outlet: "login"
	},
	{
		path: "register",
		outlet: "register"
	},
	{
		path: "user/{username}",
		outlet: "user"
	},
	{
		path: "user/{username}/favorites",
		outlet: "favorites"
	},
	{
		path: "article/{slug}",
		outlet: "article"
	},
	{
		path: "settings",
		outlet: "settings"
	},
	{
		path: "editor",
		outlet: "new-post",
		children: [
			{
				path: "editor/{slug}",
				outlet: "edit-post"
			}
		]
	},
	{
		path: "home",
		outlet: "home",
		defaultRoute: true
	}
];

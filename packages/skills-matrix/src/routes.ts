import { RouteConfig } from '@dojo/framework/routing/interfaces';

export const enum RouteName {
	Compare = 'compare',
	MultiCompare = 'multiCompare',
	EditSkills = 'editSkills',
	Home = 'home',
	Skills = 'skills'
}

export const enum OutletName {
	Main = 'main'
}

const routes: RouteConfig[] = [
	{
		path: '/',
		id: RouteName.Home,
		outlet: OutletName.Main,
		defaultRoute: true
	},
	{
		path: 'skills',
		id: RouteName.Skills,
		outlet: OutletName.Main,
		children: [
			{
				path: '{hash}',
				id: RouteName.EditSkills,
				outlet: OutletName.Main
			}
		]
	},
	{
		path: 'compare',
		id: RouteName.Compare,
		outlet: OutletName.Main,
		children: [
			{
				path: '{hashList}',
				id: RouteName.MultiCompare,
				outlet: OutletName.Main
			}
		]
	}
];

export default routes;

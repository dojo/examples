import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import HackerNewsStoryPage from '../widgets/HackerNewsStoryPage';

const HackerNewsStoryPageOutlet = Outlet(HackerNewsStoryPage, 'stories', ({ params }: MapParamsOptions) => {
	return {
		view: params.view,
		page: Number(params.page)
	};
});
export default HackerNewsStoryPageOutlet;

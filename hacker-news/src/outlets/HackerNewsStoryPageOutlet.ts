import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import HackerNewsStoryPageContainer from '../containers/HackerNewsStoryPageContainer';

const HackerNewsStoryPageOutlet = Outlet(HackerNewsStoryPageContainer, 'stories', ({ params }: MapParamsOptions) => {
	return {
		view: params.view,
		page: Number(params.page)
	};
});
export default HackerNewsStoryPageOutlet;

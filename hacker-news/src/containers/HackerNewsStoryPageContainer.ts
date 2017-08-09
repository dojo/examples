import { Container } from '@dojo/widget-core/Container';

import { HackerNewsAppContext } from '../HackerNewsAppContext';
import HackerNewsStoryPage from './../widgets/HackerNewsStoryPage';
import { story_type } from "../interfaces";

function getProperties(hackerNewsAppContext: HackerNewsAppContext, properties: any) {
	const { view, page }: { view: story_type, page: number } = properties
	if (hackerNewsAppContext.view !== view || hackerNewsAppContext.page !== page) {
		hackerNewsAppContext.fetchStories(view, page);
	}
	return {
		stories: hackerNewsAppContext.getStories(view, page),
		pages: hackerNewsAppContext.getPageCount(view),
		pageSize: hackerNewsAppContext.pageSize
	};
}

const HackerNewsStoryPageContainer = Container(HackerNewsStoryPage, 'state', { getProperties });
export default HackerNewsStoryPageContainer;

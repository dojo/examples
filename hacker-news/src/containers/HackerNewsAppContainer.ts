import { Container } from '@dojo/widget-core/Container';

import { HackerNewsAppContext } from '../HackerNewsAppContext';
import HackerNewsApp from './../widgets/HackerNewsApp';

function getProperties(hackerNewsAppContext: HackerNewsAppContext) {
	return {
		stories: hackerNewsAppContext.stories,
		pages: hackerNewsAppContext.pages,
		pageSize: hackerNewsAppContext.pageSize,
		showStories: hackerNewsAppContext.showStories
	};
}

const HackerNewsAppContainer = Container(HackerNewsApp, 'state', { getProperties });
export default HackerNewsAppContainer;

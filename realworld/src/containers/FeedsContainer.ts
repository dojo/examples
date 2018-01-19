import { Container } from '@dojo/widget-core/Container';
import { Store } from '@dojo/stores/Store';
import { Feeds, FeedsProperties } from './../widgets/Feeds';
import { fetchFeedProcess, favoriteFeedArticleProcess } from './../processes/feedProcesses';

import { State } from './../interfaces';

function getProperties(store: Store<State>, properties: FeedsProperties): FeedsProperties {
	const { get, path } = store;
	const loading = get(path('feed', 'loading'));
	const isAuthenticated = !!get(path('user', 'token'));
	const username = properties.username || get(path('user', 'username'));
	const defaultType = isAuthenticated ? 'feed' : 'global';
	const type = properties.type ? properties.type : get(path('feed', 'category')) || defaultType;

	return {
		items: get(path('feed', 'items')),
		type,
		loading,
		username,
		isAuthenticated,
		tagName: get(path('feed', 'tagName')),
		total: get(path('feed', 'total')),
		currentPage: get(path('feed', 'pageNumber')),
		fetchFeed: fetchFeedProcess(store),
		favoriteArticle: favoriteFeedArticleProcess(store)
	};
}

export const FeedsContainer = Container(Feeds, 'state', { getProperties });

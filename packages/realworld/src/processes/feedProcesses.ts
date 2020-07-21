import { createProcess } from '@dojo/framework/stores/process';
import { ArticleItem } from './../interfaces';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { FavoriteArticlePayload, FetchFeedPayload } from './interfaces';

function getItemIndex(items: ArticleItem[] | undefined, id: string) {
	items = items || [];
	let index = -1;
	for (let i = 0; i < items.length; i++) {
		if (items[i].slug === id) {
			index = i;
			break;
		}
	}
	return index;
}

const startFetchingFeedCommand = commandFactory<FetchFeedPayload>(({ state, payload: { type, filter, page } }) => {
	if (!state.feed) {
		state.feed = {};
	}
	state.feed.isLoading = true;
	state.feed.isLoaded = false;
	state.feed.category = type;
	state.feed.filter = filter;
	state.feed.tagName = type === 'tag' ? filter : undefined;
	state.feed.page = page;
	state.feed.items = undefined;
});

export const fetchFeedCommand = commandFactory<FetchFeedPayload>(async ({ state, payload: { type, page, filter } }) => {
	const token = state.session?.token;
	const offset = page * 10;
	let url: string;

	switch (type) {
		case 'feed':
			url = `${baseUrl}/articles/feed?`;
			break;
		case 'tag':
			url = `${baseUrl}/articles?tag=${filter}&`;
			break;
		default:
			url = `${baseUrl}/articles/?`;
			break;
	}

	const response = await fetch(`${url}limit=10&offset=${offset}`, { headers: getHeaders(token) });
	const json = await response.json();
	state.feed.items = json.articles;
	state.feed.total = json.articlesCount;
	state.feed.offset = offset;
	state.feed.page = page;
	state.feed.category = type;
	state.feed.filter = filter;
	state.feed.isLoading = false;
	state.feed.isLoaded = true;
});

const clearFeedCommand = commandFactory(({ state }) => {
	state.feed = {};
});

const favoriteFeedArticleCommand = commandFactory<FavoriteArticlePayload>(
	async ({ state, payload: { slug, favorited, type } }) => {
		const token = state.session?.token;
		const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
			method: favorited ? 'delete' : 'post',
			headers: getHeaders(token)
		});
		const json = await response.json();
		let articles = state.feed?.items;
		if (type === 'favorites' || type === 'user') {
			articles = state.profile.feed?.items;
		}

		const index = getItemIndex(articles, slug);

		if (index !== -1 && articles) {
			if (type === 'favorites') {
				articles.splice(index, 1);
			} else {
				articles[index] = json.article;
			}
		}
	}
);

export const fetchFeedProcess = createProcess('fetch-feed', [startFetchingFeedCommand, fetchFeedCommand]);
export const clearFeedProcess = createProcess('clear-feed', [clearFeedCommand]);
export const favoriteFeedArticleProcess = createProcess('fav-feed-article', [favoriteFeedArticleCommand]);

import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { ArticleItem } from './../interfaces';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { FavoriteArticlePayload, FetchFeedPayload } from './interfaces';

function getItemIndex(items: ArticleItem[], id: string) {
	let index = -1;
	for (let i = 0; i < items.length; i++) {
		if (items[i].slug === id) {
			index = i;
			break;
		}
	}
	return index;
}

const startFetchingFeedCommand = commandFactory<FetchFeedPayload>(({ path, payload: { type, filter, page } }) => {
	return [
		replace(path('feed', 'isLoading'), true),
		replace(path('feed', 'isLoaded'), false),
		replace(path('feed', 'category'), type),
		replace(path('feed', 'filter'), filter),
		replace(path('feed', 'tagName'), type === 'tag' ? filter : undefined),
		replace(path('feed', 'page'), page),
		replace(path('feed', 'items'), undefined)
	];
});

export const fetchFeedCommand = commandFactory<FetchFeedPayload>(
	async ({ get, path, payload: { type, page, filter } }) => {
		const token = get(path('session', 'token'));
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
		return [
			replace(path('feed', 'items'), json.articles),
			replace(path('feed', 'total'), json.articlesCount),
			replace(path('feed', 'offset'), offset),
			replace(path('feed', 'page'), page),
			replace(path('feed', 'category'), type),
			replace(path('feed', 'filter'), filter),
			replace(path('feed', 'isLoading'), false),
			replace(path('feed', 'isLoaded'), true)
		];
	}
);

const clearFeedCommand = commandFactory(({ path }) => {
	return [replace(path('feed'), undefined)];
});

const favoriteFeedArticleCommand = commandFactory<FavoriteArticlePayload>(
	async ({ get, path, payload: { slug, favorited, type } }) => {
		const token = get(path('session', 'token'));
		const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
			method: favorited ? 'delete' : 'post',
			headers: getHeaders(token)
		});
		const json = await response.json();
		let feedPath = path('feed', 'items');
		if (type === 'favorites' || type === 'user') {
			feedPath = path('profile', 'feed', 'items');
		}
		let articles = get(feedPath);

		const index = getItemIndex(articles, slug);
		articles = [...articles];
		articles[index] = json.article;

		if (index !== -1) {
			if (type === 'favorites') {
				articles.splice(index, 1);
				return [replace(feedPath, articles)];
			}
			articles[index] = json.article;
			return [replace(feedPath, articles)];
		}
		return [];
	}
);

export const fetchFeedProcess = createProcess('fetch-feed', [startFetchingFeedCommand, fetchFeedCommand]);
export const clearFeedProcess = createProcess('clear-feed', [clearFeedCommand]);
export const favoriteFeedArticleProcess = createProcess('fav-feed-article', [favoriteFeedArticleCommand]);

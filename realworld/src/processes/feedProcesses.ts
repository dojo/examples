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
		replace(path('feed', 'loading'), true),
		replace(path('feed', 'loaded'), false),
		replace(path('feed', 'category'), type),
		replace(path('feed', 'tagName'), type === 'tag' ? filter : undefined),
		replace(path('feed', 'pageNumber'), page),
		replace(path('feed', 'items'), undefined)
	];
});

export const fetchFeedCommand = commandFactory<FetchFeedPayload>(
	async ({ get, path, payload: { type, page, filter } }) => {
		const token = get(path('user', 'token'));
		const offset = page * 10;
		let url: string;

		switch (type) {
			case 'feed':
				url = `${baseUrl}/articles/feed?`;
				break;
			case 'favorites':
				url = `${baseUrl}/articles?favorited=${filter}&`;
				break;
			case 'user':
				url = `${baseUrl}/articles?author=${filter}&`;
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
			replace(path('feed', 'loading'), false),
			replace(path('feed', 'loaded'), true)
		];
	}
);

const favoriteFeedArticleCommand = commandFactory<FavoriteArticlePayload>(
	async ({ at, get, path, payload: { slug, favorited } }) => {
		const token = get(path('user', 'token'));
		const response = await fetch(`${baseUrl}/articles/${slug}/favorite`, {
			method: favorited ? 'delete' : 'post',
			headers: getHeaders(token)
		});
		const json = await response.json();
		const index = getItemIndex(get(path('feed', 'items')), slug);

		if (index !== -1) {
			return [replace(at(path('feed', 'items'), index), json.article)];
		}
		return [];
	}
);

export const fetchFeedProcess = createProcess('fetch-feed', [startFetchingFeedCommand, fetchFeedCommand]);
export const favoriteFeedArticleProcess = createProcess('fav-feed-article', [favoriteFeedArticleCommand]);

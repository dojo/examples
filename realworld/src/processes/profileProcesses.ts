import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { FollowUserPayload } from './interfaces';

const startGetProfileCommand = commandFactory(({ path }) => {
	return [
		replace(path('profile', 'user', 'isLoading'), true),
		replace(path('profile', 'user', 'isLoaded'), false),
		replace(path('profile', 'feed', 'items'), undefined)
	];
});

const startGetProfileFeedCommand = commandFactory(({ path, payload: { page, type } }) => {
	return [
		replace(path('profile', 'feed', 'isLoading'), true),
		replace(path('profile', 'feed', 'isLoaded'), false),
		replace(path('profile', 'feed', 'category'), type),
		replace(path('profile', 'feed', 'page'), page)
	];
});

const followUserCommand = commandFactory<FollowUserPayload>(async ({ get, path, payload: { username, following } }) => {
	const token = get(path('session', 'token'));
	const response = await fetch(`${baseUrl}/profiles/${username}/follow`, {
		method: following ? 'delete' : 'post',
		headers: getHeaders(token)
	});
	const json = await response.json();

	return [replace(path('profile'), json.profile)];
});

const getProfileCommand = commandFactory<{ username: string; type: string }>(
	async ({ get, path, payload: { username } }) => {
		const token = get(path('session', 'token'));
		const response = await fetch(`${baseUrl}/profiles/${username}`, {
			headers: getHeaders(token)
		});
		const json = await response.json();

		return [
			replace(path('profile', 'user', 'username'), json.profile.username),
			replace(path('profile', 'user', 'image'), json.profile.image),
			replace(path('profile', 'user', 'bio'), json.profile.bio),
			replace(path('profile', 'user', 'following'), json.profile.following),
			replace(path('profile', 'user', 'isLoading'), false),
			replace(path('profile', 'user', 'isLoaded'), true)
		];
	}
);

const getProfileFeedCommand = commandFactory<{ username: string; type: string; page: number }>(
	async ({ get, path, payload: { type, username, page } }) => {
		const token = get(path('session', 'token'));
		const offset = page * 10;
		let url = `${baseUrl}/articles?`;

		switch (type) {
			case 'favorites':
				url = `${url}favorited=${username}&`;
				break;
			case 'user':
				url = `${url}author=${username}&`;
				break;
		}

		const response = await fetch(`${url}limit=10&offset=${offset}`, { headers: getHeaders(token) });
		const json = await response.json();
		return [
			replace(path('profile', 'feed', 'items'), json.articles),
			replace(path('profile', 'feed', 'total'), json.articlesCount),
			replace(path('profile', 'feed', 'offset'), offset),
			replace(path('profile', 'feed', 'isLoading'), false),
			replace(path('profile', 'feed', 'isLoaded'), true)
		];
	}
);

export const getProfileProcess = createProcess('get-profile', [
	[startGetProfileCommand, startGetProfileFeedCommand],
	[getProfileCommand, getProfileFeedCommand]
]);
export const getProfileFeedProcess = createProcess('get-profile-feed', [
	startGetProfileFeedCommand,
	getProfileFeedCommand
]);
export const followUserProcess = createProcess('follow-user', [followUserCommand]);

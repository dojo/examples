import { createProcess } from '@dojo/framework/stores/process';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { FollowUserPayload } from './interfaces';

const startGetProfileCommand = commandFactory(({ state }) => {
	state.profile.user = { isLoading: true, isLoaded: false };
	state.feed = { items: undefined };
});

const startGetProfileFeedCommand = commandFactory(({ state, payload: { page, type } }) => {
	state.profile.feed = {
		isLoading: true,
		isLoaded: false,
		category: type,
		page: page
	};
});

const followUserCommand = commandFactory<FollowUserPayload>(async ({ state, payload: { username, following } }) => {
	const token = state.session?.token;
	const response = await fetch(`${baseUrl}/profiles/${username}/follow`, {
		method: following ? 'delete' : 'post',
		headers: getHeaders(token)
	});
	const json = await response.json();

	state.profile = json.profile;
});

const getProfileCommand = commandFactory<{ username: string; type: string }>(
	async ({ state, payload: { username } }) => {
		const token = state.session?.token;
		const response = await fetch(`${baseUrl}/profiles/${username}`, {
			headers: getHeaders(token)
		});
		const json = await response.json();

		state.profile.user = {
			username: json.profile.username,
			image: json.profile.image,
			bio: json.profile.bio,
			following: json.profile.following,
			isLoading: false,
			isLoaded: true
		};
	}
);

const getProfileFeedCommand = commandFactory<{ username: string; type: string; page: number }>(
	async ({ state, payload: { type, username, page } }) => {
		const token = state.session?.token;
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
		state.profile.feed = {
			items: json.articles,
			total: json.articlesCount,
			offset: offset,
			isLoading: false,
			isLoaded: true,
			category: type
		};
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

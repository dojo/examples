import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { FollowUserPayload, UsernamePayload } from './interfaces';

const startGetProfileCommand = commandFactory(({ path }) => {
	return [replace(path('profile', 'loading'), true), replace(path('profile', 'loaded'), false)];
});

const followUserCommand = commandFactory<FollowUserPayload>(async ({ get, path, payload: { username, following } }) => {
	const token = get(path('user', 'token'));
	const response = await fetch(`${baseUrl}/profiles/${username}/follow`, {
		method: following ? 'delete' : 'post',
		headers: getHeaders(token)
	});
	const json = await response.json();

	return [replace(path('profile'), json.profile)];
});

const getProfileCommand = commandFactory<UsernamePayload>(async ({ get, path, payload: { username } }) => {
	const token = get(path('user', 'token'));
	const response = await fetch(`${baseUrl}/profiles/${username}`, {
		headers: getHeaders(token)
	});
	const json = await response.json();

	return [
		replace(path('profile', 'image'), json.profile.image),
		replace(path('profile', 'bio'), json.profile.bio),
		replace(path('profile', 'following'), json.profile.following),
		replace(path('profile', 'loading'), false),
		replace(path('profile', 'loaded'), true)
	];
});

export const getProfileProcess = createProcess('get-profile', [startGetProfileCommand, getProfileCommand]);
export const followUserProcess = createProcess('follow-user', [followUserCommand]);

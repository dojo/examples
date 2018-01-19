import { createProcess } from '@dojo/stores/process';
import { replace } from '@dojo/stores/state/operations';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { EmailPayload, PasswordPayload, UsernamePayload, ImagePayload, BioPayload } from './interfaces';

const emailInputCommand = commandFactory<EmailPayload>(({ payload: { email }, path }) => {
	return [replace(path('settings', 'email'), email)];
});

const passwordInputCommand = commandFactory<PasswordPayload>(({ payload: { password }, path }) => {
	return [replace(path('settings', 'password'), password)];
});

const usernameInputCommand = commandFactory<UsernamePayload>(({ payload: { username }, path }) => {
	return [replace(path('settings', 'username'), username)];
});

const bioInputCommand = commandFactory<BioPayload>(({ payload: { bio }, path }) => {
	return [replace(path('settings', 'bio'), bio)];
});

const imageUrlInputCommand = commandFactory<ImagePayload>(({ payload: { imageUrl }, path }) => {
	return [replace(path('settings', 'image'), imageUrl)];
});

const startUserSettingsCommand = commandFactory(({ path }) => {
	return [replace(path('settings'), { loaded: false, loading: true })];
});

const getUserSettingsCommand = commandFactory(({ path, get }) => {
	return [replace(path('settings'), get(path('user')))];
});

const updateUserSettingsCommand = commandFactory(async ({ path, get }) => {
	const token = get(path('user', 'token'));
	const requestPayload = get(path('settings'));
	const response = await fetch(`${baseUrl}/user`, {
		method: 'put',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});

	const json = await response.json();

	return [
		replace(path('user'), json.user),
		replace(path('settings'), { loaded: false, loading: false }),
		replace(path('routing', 'outlet'), 'user'),
		replace(path('routing', 'params'), { username: get(path('settings', 'username')) })
	];
});

export const getUserSettingsProcess = createProcess([startUserSettingsCommand, getUserSettingsCommand]);
export const updateUserSettingsProcess = createProcess([updateUserSettingsCommand]);
export const usernameInputProcess = createProcess([usernameInputCommand]);
export const emailInputProcess = createProcess([emailInputCommand]);
export const passwordInputProcess = createProcess([passwordInputCommand]);
export const bioInputProcess = createProcess([bioInputCommand]);
export const imageUrlInputProcess = createProcess([imageUrlInputCommand]);

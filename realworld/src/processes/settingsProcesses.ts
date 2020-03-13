import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
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
	return [replace(path('settings'), { isLoaded: false, isLoading: false })];
});

const getUserSettingsCommand = commandFactory(({ path, get }) => {
	return [replace(path('settings'), get(path('session')))];
});

const updateUserSettingsCommand = commandFactory(async ({ path, get }) => {
	const token = get(path('session', 'token'));
	const requestPayload = get(path('settings'));
	const response = await fetch(`${baseUrl}/user`, {
		method: 'put',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});

	const json = await response.json();

	return [
		replace(path('session'), json.user),
		replace(path('settings'), undefined),
		replace(path('routing', 'outlet'), 'user'),
		replace(path('routing', 'params'), { username: get(path('settings', 'username')) })
	];
});

export const getUserSettingsProcess = createProcess('user-settings', [
	startUserSettingsCommand,
	getUserSettingsCommand
]);
export const updateUserSettingsProcess = createProcess('update-user-settings', [updateUserSettingsCommand]);
export const usernameInputProcess = createProcess('username-input', [usernameInputCommand]);
export const emailInputProcess = createProcess('email-input', [emailInputCommand]);
export const passwordInputProcess = createProcess('password-input', [passwordInputCommand]);
export const bioInputProcess = createProcess('bio-input', [bioInputCommand]);
export const imageUrlInputProcess = createProcess('image-url-input', [imageUrlInputCommand]);

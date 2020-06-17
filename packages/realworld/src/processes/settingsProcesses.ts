import { createProcess } from '@dojo/framework/stores/process';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { EmailPayload, PasswordPayload, UsernamePayload, ImagePayload, BioPayload } from './interfaces';

const emailInputCommand = commandFactory<EmailPayload>(({ payload: { email }, state }) => {
	state.settings.email = email;
});

const passwordInputCommand = commandFactory<PasswordPayload>(({ payload: { password }, state }) => {
	state.settings.password = password;
});

const usernameInputCommand = commandFactory<UsernamePayload>(({ payload: { username }, state }) => {
	state.settings.username = username;
});

const bioInputCommand = commandFactory<BioPayload>(({ payload: { bio }, state }) => {
	state.settings.bio = bio;
});

const imageUrlInputCommand = commandFactory<ImagePayload>(({ payload: { imageUrl }, state }) => {
	state.settings.image = imageUrl;
});

const startUserSettingsCommand = commandFactory(({ state }) => {
	state.settings = { isLoaded: false, isLoading: false };
});

const getUserSettingsCommand = commandFactory(({ state }) => {
	state.settings = { ...state.session };
});

const updateUserSettingsCommand = commandFactory(async ({ state }) => {
	const token = state.session?.token;
	const requestPayload = state.settings;
	const response = await fetch(`${baseUrl}/user`, {
		method: 'put',
		headers: getHeaders(token),
		body: JSON.stringify(requestPayload)
	});

	const json = await response.json();

	state.session = json.user;
	state.settings = {};
	state.routing = {
		outlet: 'user',
		params: { username: state.settings.username || '' }
	};
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

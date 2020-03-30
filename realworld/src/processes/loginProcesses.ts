import global from '@dojo/framework/shim/global';
import { createProcess } from '@dojo/framework/stores/process';
import { replace } from '@dojo/framework/stores/state/operations';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { SetSessionPayload } from './interfaces';

const startLoginCommand = commandFactory(({ path }) => {
	return [replace(path('login', 'isLoading'), true)];
});

const startRegisterCommand = commandFactory(({ path }) => {
	return [replace(path('register', 'isLoading'), true)];
});

const setSessionCommand = commandFactory<SetSessionPayload>(({ path, payload: { session } }) => {
	return [replace(path('session'), session)];
});

const loginCommand = commandFactory<{ email: string; password: string }>(async ({ path, payload }) => {
	const requestPayload = {
		user: {
			email: payload.email,
			password: payload.password
		}
	};

	const response = await fetch(`${baseUrl}/users/login`, {
		method: 'post',
		body: JSON.stringify(requestPayload),
		headers: getHeaders()
	});

	const json = await response.json();
	if (!response.ok) {
		return [
			replace(path('login', 'isLoading'), true),
			replace(path('errors'), json.errors),
			replace(path('session'), {})
		];
	}

	global.sessionStorage.setItem('conduit-session', JSON.stringify(json.user));

	return [
		replace(path('routing', 'outlet'), 'home'),
		replace(path('login', 'isLoading'), false),
		replace(path('errors'), undefined),
		replace(path('session'), json.user)
	];
});

const registerCommand = commandFactory<{ username: string; email: string; password: string }>(
	async ({ path, payload: { username, email, password } }) => {
		const requestPayload = {
			user: {
				username,
				email,
				password
			}
		};

		const response = await fetch(`${baseUrl}/users`, {
			method: 'post',
			body: JSON.stringify(requestPayload),
			headers: getHeaders()
		});
		const json = await response.json();
		if (!response.ok) {
			return [
				replace(path('register', 'isLoading'), false),
				replace(path('errors'), json.errors),
				replace(path('session'), {})
			];
		}

		global.sessionStorage.setItem('conduit-session', JSON.stringify(json.user));

		return [
			replace(path('routing', 'outlet'), 'home'),
			replace(path('register', 'isLoading'), false),
			replace(path('errors'), undefined),
			replace(path('session'), json.user)
		];
	}
);

const logoutCommand = commandFactory(({ path }) => {
	global.sessionStorage.removeItem('conduit-session');
	return [replace(path('session'), {}), replace(path('routing', 'outlet'), 'home')];
});

export const loginProcess = createProcess('login', [startLoginCommand, loginCommand]);
export const registerProcess = createProcess('register', [startRegisterCommand, registerCommand]);
export const setSessionProcess = createProcess('set-session', [setSessionCommand]);
export const logoutProcess = createProcess('logout', [logoutCommand]);

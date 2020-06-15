import global from '@dojo/framework/shim/global';
import { createProcess } from '@dojo/framework/stores/process';
import { getHeaders, commandFactory } from './utils';
import { baseUrl } from '../config';
import { SetSessionPayload } from './interfaces';

const startLoginCommand = commandFactory(({ state }) => {
	state.login = { isLoading: true, isLoaded: false };
});

const startRegisterCommand = commandFactory(({ state }) => {
	state.register = { isLoading: true, isLoaded: false };
});

const setSessionCommand = commandFactory<SetSessionPayload>(({ state, payload: { session } }) => {
	state.session = session;
});

const loginCommand = commandFactory<{ email: string; password: string }>(async ({ state, payload }) => {
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
		state.login.isLoading = true;
		state.errors = json.errors;
		state.session = undefined;
		return;
	}

	global.sessionStorage.setItem('conduit-session', JSON.stringify(json.user));

	state.routing.outlet = 'home';
	state.login.isLoading = false;
	state.errors = undefined;
	state.session = json.user;
});

const registerCommand = commandFactory<{ username: string; email: string; password: string }>(
	async ({ state, payload: { username, email, password } }) => {
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
			state.register.isLoading = false;
			state.errors = json.errors;
			state.session = undefined;
			return;
		}

		global.sessionStorage.setItem('conduit-session', JSON.stringify(json.user));

		state.routing.outlet = 'home';
		state.register.isLoading = false;
		state.errors = undefined;
		state.session = json.user;
	}
);

const logoutCommand = commandFactory(({ state }) => {
	global.sessionStorage.removeItem('conduit-session');
	state.session = undefined;
	state.routing.outlet = 'home';
});

export const loginProcess = createProcess('login', [startLoginCommand, loginCommand]);
export const registerProcess = createProcess('register', [startRegisterCommand, registerCommand]);
export const setSessionProcess = createProcess('set-session', [setSessionCommand]);
export const logoutProcess = createProcess('logout', [logoutCommand]);

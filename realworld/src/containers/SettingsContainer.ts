import { Store } from '@dojo/framework/stores/Store';
import { Settings, SettingsProperties } from './../widgets/Settings';
import {
	bioInputProcess,
	emailInputProcess,
	passwordInputProcess,
	imageUrlInputProcess,
	usernameInputProcess,
	updateUserSettingsProcess
} from './../processes/settingsProcesses';
import { logoutProcess } from '../processes/loginProcesses';
import { State } from '../interfaces';
import { StoreContainer } from '@dojo/framework/stores/StoreInjector';

function getProperties(store: Store<State>): SettingsProperties {
	const { get, path } = store;

	return {
		email: get(path('settings', 'email')),
		password: get(path('settings', 'password')),
		username: get(path('settings', 'username')),
		imageUrl: get(path('settings', 'image')),
		bio: get(path('settings', 'bio')),
		onEmailInput: emailInputProcess(store),
		onPasswordInput: passwordInputProcess(store),
		onUsernameInput: usernameInputProcess(store),
		onBioInput: bioInputProcess(store),
		onImageUrlInput: imageUrlInputProcess(store),
		onUpdateSettings: updateUserSettingsProcess(store),
		logout: logoutProcess(store)
	};
}

export default StoreContainer(Settings, 'state', { paths: [['settings']], getProperties });

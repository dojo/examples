import { create, tsx } from '@dojo/framework/core/vdom';
import store from '../store';
import {
	bioInputProcess,
	emailInputProcess,
	passwordInputProcess,
	imageUrlInputProcess,
	getUserSettingsProcess,
	usernameInputProcess,
	updateUserSettingsProcess
} from './../processes/settingsProcesses';
import { logoutProcess } from '../processes/loginProcesses';

const factory = create({ store });

export const Settings = factory(function Settings({ middleware: { store } }) {
	const { get, path, executor } = store;
	let settings = get(path('settings'));

	if (!settings.username) {
		executor(getUserSettingsProcess)({});
		settings = get(path('settings'));
	}

	return (
		<div classes={['editor-page']}>
			<div classes={['container', 'page']}>
				<div classes={['row']}>
					<div classes={['col-md-10', 'offset-md-1', 'col-xs-12']}>
						<h1 classes={['text-xs-center']}>Your Settings</h1>
						<form>
							<fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={settings.image}
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLInputElement;
											executor(imageUrlInputProcess)({ imageUrl: target.value });
										}}
										placeholder=""
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={settings.username}
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLInputElement;
											executor(usernameInputProcess)({ username: target.value });
										}}
										placeholder="Your Name"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<textarea
										rows={8}
										value={settings.bio}
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLTextAreaElement;
											executor(bioInputProcess)({ bio: target.value });
										}}
										placeholder="Short bio about you"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={settings.email}
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLInputElement;
											executor(emailInputProcess)({ email: target.value });
										}}
										placeholder="Email"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<fieldset classes={['form-group']}>
									<input
										value={settings.password}
										type="password"
										oninput={(event: KeyboardEvent) => {
											const target = event.target as HTMLInputElement;
											executor(passwordInputProcess)({ password: target.value });
										}}
										placeholder="Password"
										classes={['form-control', 'form-control-lg']}
									/>
								</fieldset>
								<button
									onclick={(event: MouseEvent) => {
										event.preventDefault();
										executor(updateUserSettingsProcess)({});
									}}
									type="submit"
									classes={['btn', 'btn-lg', 'btn-primary', 'pull-xs-right']}
								>
									Update Settings
								</button>
							</fieldset>
						</form>
						<hr />
						<button
							onclick={() => {
								executor(logoutProcess)({});
							}}
							classes={['btn', 'btn-outline-danger']}
						>
							Or click here to logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Settings;

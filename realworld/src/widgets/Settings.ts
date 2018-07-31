import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';
import { WithTarget } from '../interfaces';
import { createInputNode } from '../utils';
import { ImagePayload, UsernamePayload, BioPayload, EmailPayload, PasswordPayload } from '../processes/interfaces';

export interface SettingsProperties {
	imageUrl: string;
	username: string;
	bio: string;
	email: string;
	password: string;
	onImageUrlInput: (opts: ImagePayload) => void;
	onUsernameInput: (opts: UsernamePayload) => void;
	onBioInput: (opts: BioPayload) => void;
	onEmailInput: (opts: EmailPayload) => void;
	onPasswordInput: (opts: PasswordPayload) => void;
	onUpdateSettings: (opts: object) => void;
	logout: (opts: object) => void;
}

export class Settings extends WidgetBase<SettingsProperties> {
	private _onSubmit(event: MouseEvent) {
		event.preventDefault();
		this.properties.onUpdateSettings({});
	}

	private _onImageUrlInput({ target: { value: imageUrl } }: WithTarget) {
		this.properties.onImageUrlInput({ imageUrl });
	}

	private _onUsernameInput({ target: { value: username } }: WithTarget) {
		this.properties.onUsernameInput({ username });
	}

	private _onBioInput({ target: { value: bio } }: WithTarget) {
		this.properties.onBioInput({ bio });
	}

	private _onEmailInput({ target: { value: email } }: WithTarget) {
		this.properties.onEmailInput({ email });
	}

	private _onPasswordInput({ target: { value: password } }: WithTarget) {
		this.properties.onPasswordInput({ password });
	}

	private _logout() {
		this.properties.logout({});
	}

	// prettier-ignore
	protected render() {
		const { email, password, bio, imageUrl, username } = this.properties;

		return v('div', { classes: 'settings-page' }, [
			v('div', { classes: ['container', 'page'] }, [
				v('div', { classes: 'row' }, [
					v('div', { classes: ['col-md-6', 'offset-md-3', 'col-xs-12'] }, [
						v('h1', { classes: 'text-xs-center' }, ['Your Settings']),
						v('form', [
							v('fieldset', [
								createInputNode(imageUrl, 'URL of profile picture', this._onImageUrlInput),
								createInputNode(username, 'Your Name', this._onUsernameInput),
								v('fieldset', { classes: 'form-group' }, [
									v('textarea', {
										value: bio,
										classes: ['form-control', 'form-control-lg'],
										rows: 8,
										placeholder: 'Short bio about you',
										oninput: this._onBioInput
									})
								]),
								createInputNode(email, 'Email', this._onEmailInput),
								createInputNode(password, 'Password', this._onPasswordInput),
								v('button', {
									onclick: this._onSubmit,
									type: 'submit',
									classes: ['btn', 'btn-lg', 'btn-primary', 'pull-xs-right']
								}, ['Update Settings'])
							])
						]),
						v('hr'),
						v('button', { onclick: this._logout, classes: ['btn', 'btn-outline-danger'] }, [
							'Or click here to logout'
						])
					])
				])
			])
		]);
	}
}

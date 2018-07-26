import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Link } from '@dojo/framework/routing/Link';
import { Errors, WithTarget } from '../interfaces';
import { ErrorList } from './ErrorList';
import { createInputNode } from '../utils';
import { PasswordPayload, EmailPayload, UsernamePayload } from '../processes/interfaces';

export interface RegisterProperties {
	email: string;
	password: string;
	username: string;
	inProgress?: boolean;
	errors: Errors;
	onPasswordInput: (opts: PasswordPayload) => void;
	onEmailInput: (opts: EmailPayload) => void;
	onUsernameInput: (opts: UsernamePayload) => void;
	onRegister: (opts: object) => void;
}

export class Register extends WidgetBase<RegisterProperties> {
	private _onEmailInput({ target: { value: email } }: WithTarget) {
		this.properties.onEmailInput({ email });
	}

	private _onPasswordInput({ target: { value: password } }: WithTarget) {
		this.properties.onPasswordInput({ password });
	}

	private _onUsernameInput({ target: { value: username } }: WithTarget) {
		this.properties.onUsernameInput({ username });
	}

	private _onRegister(event: Event) {
		event.preventDefault();
		this.properties.onRegister({});
	}

	// prettier-ignore
	protected render() {
		const { errors, email, password, username, inProgress = false } = this.properties;

		return v('div', { classes: 'auth-page' }, [
			v('div', { classes: ['container', 'page'] }, [
				v('div', { classes: 'row' }, [
					v('div', { classes: ['col-md-6', 'offset-md-3', 'col-xs-12'] }, [
						v('h1', { classes: 'text-xs-center' }, ['Sign Up']),
						v('p', { classes: 'text-xs-center' }, [w(Link, { to: 'login' }, ['Have an account?'])]),
						errors ? w(ErrorList, { errors }) : null,
						v('form', { onsubmit: this._onRegister }, [
							v('fieldset', [
								v('fieldset', { classes: 'form-group' }, [
									createInputNode(username, 'Username', this._onUsernameInput)
								]),
								v('fieldset', { classes: 'form-group' }, [
									createInputNode(email, 'Email', this._onEmailInput)
								]),
								v('fieldset', { classes: 'form-group' }, [
									createInputNode(password, 'Password', this._onPasswordInput)
								]),
								v('button', {
									classes: ['btn btn-lg', 'btn-primary', 'pull-xs-right'],
									disabled: inProgress,
									type: 'submit'
								}, ['Sign Up'])
							])
						])
					])
				])
			])
		]);
	}
}

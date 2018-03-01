import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { Errors, WithTarget } from '../interfaces';
import { ErrorList } from './ErrorList';
import { PasswordPayload, EmailPayload } from '../processes/interfaces';

export interface LoginProperties {
	email: string;
	password: string;
	inProgress?: boolean;
	errors: Errors;
	onPasswordInput: (opts: PasswordPayload) => void;
	onEmailInput: (opts: EmailPayload) => void;
	onLogin: (opts: object) => void;
}

export class Login extends WidgetBase<LoginProperties> {
	private _onEmailInput({ target: { value: email } }: WithTarget) {
		this.properties.onEmailInput({ email });
	}

	private _onPasswordInput({ target: { value: password } }: WithTarget) {
		this.properties.onPasswordInput({ password });
	}

	private _onLogin(event: Event) {
		event.preventDefault();
		this.properties.onLogin({});
	}

	// prettier-ignore
	protected render() {
		const { errors, email, password, inProgress = false } = this.properties;

		return v('div', { classes: 'auth-page' }, [
			v('div', { classes: ['container', 'page'] }, [
				v('div', { classes: 'row' }, [
					v('div', { classes: ['col-md-6', 'offset-md-3', 'col-xs-12'] }, [
						v('h1', { classes: 'text-xs-center' }, ['Sign In']),
						v('p', { classes: 'text-xs-center' }, [w(Link, { to: 'register' }, ['Need an account?'])]),
						errors ? w(ErrorList, { errors }) : null,
						v('form', { onsubmit: this._onLogin }, [
							v('fieldset', [
								v('fieldset', { classes: 'form-group' }, [
									v('input', {
										classes: ['form-control', 'form-control-lg'],
										type: 'email',
										placeholder: 'Email',
										oninput: this._onEmailInput,
										value: email
									})
								]),
								v('fieldset', { classes: 'form-group' }, [
									v('input', {
										classes: ['form-control', 'form-control-lg'],
										type: 'password',
										placeholder: 'Password',
										oninput: this._onPasswordInput,
										value: password
									})
								]),
								v('button', {
									classes: ['btn btn-lg', 'btn-primary', 'pull-xs-right'],
									disabled: inProgress,
									type: 'submit'
								}, ['Sign In'])
							])
						])
					])
				])
			])
		]);
	}
}

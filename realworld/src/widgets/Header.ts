import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import Link from '@dojo/framework/routing/Link';

export interface HeaderProperties {
	isAuthenticated: boolean;
	loggedInUser: string;
}

export class Header extends WidgetBase<HeaderProperties> {
	private _authenticatedMenu() {
		const { loggedInUser } = this.properties;
		return [
			v('li', { key: 'new-post', classes: 'nav-item' }, [
				w(ActiveLink, { classes: ['nav-link'], activeClasses: ['active'], to: 'new-post' }, [
					v('i', { classes: 'ion-compose' }),
					'New Post'
				])
			]),
			v('li', { key: 'settings', classes: 'nav-item' }, [
				w(ActiveLink, { classes: ['nav-link'], activeClasses: ['active'], to: 'settings' }, [
					v('i', { classes: 'ion-gear' }),
					'Settings'
				])
			]),
			v('li', { key: 'user', classes: 'nav-item' }, [
				w(Link, { classes: ['nav-link'], to: 'user', params: { username: loggedInUser } }, [
					v('i', { classes: 'ion-gear' }),
					loggedInUser
				])
			])
		];
	}

	private _unauthenticatedMenu() {
		return [
			v('li', { key: 'sign-in', classes: 'nav-item' }, [
				w(ActiveLink, { classes: ['nav-link'], activeClasses: ['active'], to: 'login' }, ['Sign In'])
			]),
			v('li', { key: 'sign-up', classes: 'nav-item' }, [
				w(ActiveLink, { classes: ['nav-link'], activeClasses: ['active'], to: 'register' }, ['Sign Up'])
			])
		];
	}

	protected render() {
		const { isAuthenticated } = this.properties;

		return v('nav', { classes: ['navbar', 'navbar-light'] }, [
			v('div', { classes: 'container' }, [
				v('a', { classes: 'navbar-brand' }, ['conduit']),
				v('ul', { classes: ['nav', 'navbar-nav pull-xs-right'] }, [
					v('li', { classes: 'nav-item' }, [
						w(ActiveLink, { classes: ['nav-link'], activeClasses: ['active'], to: 'home' }, ['Home'])
					]),
					...(isAuthenticated ? this._authenticatedMenu() : this._unauthenticatedMenu())
				])
			])
		]);
	}
}

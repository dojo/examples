import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { Link } from '@dojo/routing/Link';
import { DNode } from '@dojo/widget-core/interfaces';

export interface HeaderProperties {
	isAuthenticated: boolean;
	loggedInUser: string;
	route: string;
}

export class Header extends WidgetBase<HeaderProperties> {
	private _authenticatedMenu() {
		const { route, loggedInUser } = this.properties;
		return [
			v('li', { key: 'new-post', classes: 'nav-item' }, [
				w(Link, { classes: ['nav-link', route === 'new-post' ? 'active' : null], to: 'new-post' }, [
					v('i', { classes: 'ion-compose' }),
					'New Post'
				])
			]),
			v('li', { key: 'settings', classes: 'nav-item' }, [
				w(Link, { classes: ['nav-link', route === 'settings' ? 'active' : null], to: 'settings' }, [
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

	private _unauthenticatedMenu(): DNode[] {
		const { route } = this.properties;
		return [
			v('li', { key: 'sign-in', classes: 'nav-item' }, [
				w(Link, { classes: ['nav-link', route === 'login' ? 'active' : null], to: 'login' }, ['Sign In'])
			]),
			v('li', { key: 'sign-up', classes: 'nav-item' }, [
				w(Link, { classes: ['nav-link', route === 'register' ? 'active' : null], to: 'register' }, ['Sign Up'])
			])
		];
	}

	protected render() {
		const { isAuthenticated, route } = this.properties;

		return v('nav', { classes: ['navbar', 'navbar-light'] }, [
			v('div', { classes: 'container' }, [
				v('a', { classes: 'navbar-brand' }, ['conduit']),
				v('ul', { classes: ['nav', 'navbar-nav pull-xs-right'] }, [
					v('li', { classes: 'nav-item' }, [
						w(Link, { classes: ['nav-link', route === '/' ? 'active' : null], to: 'home' }, ['Home'])
					]),
					...(isAuthenticated ? this._authenticatedMenu() : this._unauthenticatedMenu())
				])
			])
		]);
	}
}

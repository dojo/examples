import { Container } from '@dojo/widget-core/Container';
import { Store } from '@dojo/stores/Store';
import { Header, HeaderProperties } from './../widgets/Header';
import { State } from '../interfaces';

function getProperties(store: Store<State>): HeaderProperties {
	const { get, path } = store;

	return {
		route: get(path('routing', 'outlet')),
		isAuthenticated: !!get(path('user', 'token')),
		loggedInUser: get(path('user', 'username'))
	};
}

export const HeaderContainer = Container(Header, 'state', { getProperties });

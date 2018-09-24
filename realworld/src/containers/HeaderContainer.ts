import { Store } from '@dojo/framework/stores/Store';
import { Header, HeaderProperties } from './../widgets/Header';
import { State } from '../interfaces';
import { StoreContainer } from '@dojo/framework/stores/StoreInjector';

function getProperties(store: Store<State>): HeaderProperties {
	const { get, path } = store;

	return {
		isAuthenticated: !!get(path('user', 'token')),
		loggedInUser: get(path('user', 'username'))
	};
}

export default StoreContainer(Header, 'state', { paths: [['user']], getProperties });

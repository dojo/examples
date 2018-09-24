import { Store } from '@dojo/framework/stores/Store';
import { Profile, ProfileProperties } from './../widgets/Profile';
import { State } from '../interfaces';
import { followUserProcess } from './../processes/profileProcesses';
import { StoreContainer } from '@dojo/framework/stores/StoreInjector';

function getProperties(store: Store<State>, properties: ProfileProperties): ProfileProperties {
	const { get, path } = store;

	return {
		username: properties.username,
		type: properties.type,
		image: get(path('profile', 'image')),
		bio: get(path('profile', 'bio')),
		following: get(path('profile', 'following')),
		currentUser: get(path('user', 'username')),
		followUser: followUserProcess(store)
	};
}

export default StoreContainer(Profile, 'state', { paths: [['profile'], ['user']], getProperties });

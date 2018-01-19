import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

const mapParams = ({ params, type }: MapParamsOptions) => {
	return {
		username: params.username,
		type: type === 'index' ? 'user' : 'favorites'
	};
};

export const ProfileOutlet = Outlet('profile', 'user', { mapParams });

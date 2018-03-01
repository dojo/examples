import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

function createMapParams(type: string) {
	return ({ params }: MapParamsOptions) => {
		return {
			username: params.username,
			type
		};
	};
}

export const UserProfileOutlet = Outlet({ index: 'profile' }, 'user', { mapParams: createMapParams('user') });
export const FavProfileOutlet = Outlet('profile', 'favorites', { mapParams: createMapParams('favorites') });

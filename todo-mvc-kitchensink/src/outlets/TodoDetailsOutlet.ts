import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoDetailsContainer } from './../containers/TodoDetailsContainer';

export const TodoDetailsOutlet = Outlet(TodoDetailsContainer, 'edit', ({ params, router }: MapParamsOptions) => {
	return {
		id: params.id,
		onRequestExit() {
			router.setPath(router.link('view'));
		}
	};
});

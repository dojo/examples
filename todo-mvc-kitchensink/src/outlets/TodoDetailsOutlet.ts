import { Outlet } from '@dojo/routing/Outlet';
import { Router } from '@dojo/routing/Router';

import { TodoDetailsContainer } from './../containers/TodoDetailsContainer';

export const TodoDetailsOutlet = Outlet(TodoDetailsContainer, 'edit', (params: any, type: string, location: string, router: Router<any>) => {
	return {
		id: params.id,
		onRequestExit() {
			router.setPath(router.link('view'));
		}
	};
});

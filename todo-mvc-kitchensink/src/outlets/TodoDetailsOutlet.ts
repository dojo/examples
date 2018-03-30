import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import TodoDetailsContainer from './../containers/TodoDetailsContainer';

export default Outlet(TodoDetailsContainer, 'edit', { mapParams: ({ params, router }) => {
	return {
		id: params.id,
		onRequestExit() {
			const link = router.link('view');
			link && router.setPath(link);
		}
	};
}});

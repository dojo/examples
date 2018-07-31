import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

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

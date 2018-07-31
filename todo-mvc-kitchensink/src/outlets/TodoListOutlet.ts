import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

import TodoList from './../widgets/TodoList';

export default Outlet(TodoList, 'view', { mapParams: ({ queryParams, params, router }) => {
	return {
		view: params.view,
		filter: queryParams.filter,
		editTodo({ id }: {id: string}) {
			const link = router.link('edit', { id });
			link && router.setPath(link);
		}
	};
}});

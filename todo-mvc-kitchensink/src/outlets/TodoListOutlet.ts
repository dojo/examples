import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoList } from './../widgets/TodoList';

export const TodoListOutlet = Outlet(TodoList, 'view', { mapParams: ({ queryParams, params, router }) => {
	return {
		view: params.view,
		filter: queryParams.filter,
		editTodo({ id }: {id: string}) {
			const link = router.link('edit', { id });
			link && router.setPath(link);
		}
	};
}});

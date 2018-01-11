import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoList } from './../widgets/TodoList';

export const TodoListOutlet = Outlet(TodoList, 'view', ({ params, router }: MapParamsOptions) => {
	return {
		view: params.view,
		filter: params.filter,
		editTodo({ id }: {id: string}) {
			router.setPath(router.link('edit', { id }));
		}
	};
});

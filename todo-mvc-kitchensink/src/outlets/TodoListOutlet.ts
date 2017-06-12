import { Outlet } from '@dojo/routing/Outlet';
import { Router } from '@dojo/routing/Router';

import { TodoList } from './../widgets/TodoList';

export const TodoListOutlet = Outlet(TodoList, 'view', (params: any, type: string, location: string, router: Router<any>) => {
	return {
		view: params.view,
		filter: params.filter,
		editTodo(id: string) {
			router.setPath(router.link('edit', { id }));
		}
	};
});

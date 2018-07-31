import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

import { TodoList } from './../widgets/TodoList';

export const TodoListOutlet = Outlet(TodoList, 'filter', { mapParams: ({ params, router }: MapParamsOptions) => {
	return { filter: params.filter };
}});

export default TodoListOutlet;

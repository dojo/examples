import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoList } from './../widgets/TodoList';

export const TodoListOutlet = Outlet(TodoList, 'filter', ({ params, router }: MapParamsOptions) => {
	return { filter: params.filter };
});

export default TodoListOutlet;

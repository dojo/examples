import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

import { TodoFooter } from './../widgets/TodoFooter';

export const TodoFooterOutlet = Outlet(TodoFooter, 'filter', { mapParams: ({ params }: MapParamsOptions) => {
	return { filter: params.filter };
}});

export default TodoFooterOutlet;

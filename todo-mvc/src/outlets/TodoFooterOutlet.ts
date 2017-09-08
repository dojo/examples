import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoFooter } from './../widgets/TodoFooter';

export const TodoFooterOutlet = Outlet(TodoFooter, 'filter', ({ params }: MapParamsOptions) => {
	return { filter: params.filter };
});

export default TodoFooterOutlet;

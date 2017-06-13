import { Outlet } from '@dojo/routing/Outlet';
import { MapParamsOptions } from '@dojo/routing/interfaces';

import { TodoFooter } from './../widgets/TodoFooter';

export const TodoFooterOutlet = Outlet(TodoFooter, 'view', ({ params }: MapParamsOptions) => {
	return { view: params.view, filter: params.filter };
});

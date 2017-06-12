import { Outlet } from '@dojo/routing/Outlet';

import { TodoFooter } from './../widgets/TodoFooter';

export const TodoFooterOutlet = Outlet(TodoFooter, 'view', (params: any) => {
	return { view: params.view, filter: params.filter };
});

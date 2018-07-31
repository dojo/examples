import { Outlet } from '@dojo/framework/routing/Outlet';
import { MapParamsOptions } from '@dojo/framework/routing/interfaces';

import TodoFooter from './../widgets/TodoFooter';

export default Outlet(TodoFooter, 'view', { mapParams: ({ queryParams, params }) => {
	return { view: params.view, filter: queryParams.filter };
}});

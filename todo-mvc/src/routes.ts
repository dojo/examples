import createRouter from '@dojo/routing/createRouter';
import { Parameters } from '@dojo/routing/interfaces';
import createHashHistory from '@dojo/routing/history/createHashHistory';

interface FilterParameters extends Parameters {
	filter: 'active' | 'all' | 'completed';
}

const router = createRouter({ history: createHashHistory() });
export default router;

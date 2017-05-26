import Router from '@dojo/routing/Router';
import { Parameters } from '@dojo/routing/interfaces';
import HashHistory from '@dojo/routing/history/HashHistory';

interface FilterParameters extends Parameters {
	filter: 'active' | 'all' | 'completed';
}

const router = new Router({ history: new HashHistory() });
export default router;

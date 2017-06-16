import Router from '@dojo/routing/Router';
import HashHistory from '@dojo/routing/history/HashHistory';

const router = new Router({ history: new HashHistory() });
export default router;

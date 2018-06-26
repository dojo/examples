import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Registry } from '@dojo/widget-core/Registry';
import { Context } from './Context';
import { AppContainer } from './containers/AppContainer';

const registry = new Registry();
let context: Context;
registry.defineInjector('state', (invalidator) => {
	context = new Context(invalidator);
	return () => context;
});

function router() {
	const [, route = 'top', id = '1'] = window.location.hash.split('/');
	if (route === 'user') {
		context.route = 'user';
	} else if (route === 'comments') {
		if (id !== context.itemId || context.route !== 'comments') {
			context.fetchItem(id);
		}
	} else {
		if (route !== context.category || parseInt(id, 10) !== context.page || context.route !== 'content') {
			context.fetchStories(route, parseInt(id, 10));
		}
	}
}

window.onhashchange = router;
router();

const Projector = ProjectorMixin(AppContainer);
const projector = new Projector();
projector.setProperties({ registry });
projector.merge(document.getElementById('app') || undefined);

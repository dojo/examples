import renderer from '@dojo/framework/widget-core/vdom';
import { w } from '@dojo/framework/widget-core/d';
import { Registry } from '@dojo/framework/widget-core/Registry';
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

const r = renderer(() => w(AppContainer, {}));
r.mount({ domNode: document.getElementById('app') as HTMLElement, registry });

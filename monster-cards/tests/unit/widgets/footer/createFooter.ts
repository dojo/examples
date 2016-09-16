import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import Map from 'dojo-shim/Map';

import createFooter from './../../../../src/widgets/footer/createFooter';

let widgetMap = new Map<string, any>();
let idx = 0;

const widgetRegistry = {
	stack: <any[]> [],
	get(id: any): Promise<any> {
		widgetRegistry.stack.push(id);
		return Promise.resolve(widgetMap.get(id));
	},
	identify(value: any): any {
		return '';
	},
	create<T>(factory: any, options?: any): Promise<any> {
		const widget = createWidget(factory, options);
		const id = options && options.id || `widget${idx++}`;

		widgetMap.set(id, widget);
		return Promise.resolve([id, widget]);
	}
};

const registryProvider: any = {
	get(type: string) {
		return type === 'widgets' ? widgetRegistry : null;
	}
};

function createWidget(factory: any, options: any) {
	if (!options.registryProvider) {
		options.registryProvider = registryProvider;
	}
	return factory(options);
}

registerSuite({
	name: 'createFooter',
	render() {
		const navbar = createFooter({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));

		return promise.then(() => {
			const vnode = navbar.render();

			assert.strictEqual(vnode.vnodeSelector, 'footer');
			assert.strictEqual(vnode.children.length, 2);
		});
	}
});

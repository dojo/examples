import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import Map from 'dojo-shim/Map';

import createNavActions from './../../../../src/widgets/navbar/createNavActions';

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
	},
	has() {
		return Promise.resolve(true);
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
	name: 'createNavActions',
	render() {
		const navActions = createNavActions({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 50));

		return promise.then(() => {
			const vnode = navActions.render();

			assert.strictEqual(vnode.vnodeSelector, 'ul');
			assert.strictEqual(vnode.children.length, 2);
		});
	}
});

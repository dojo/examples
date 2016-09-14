import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import Promise from 'dojo-shim/Promise';

import createSearchInput from './../../../../src/widgets/common/createSearchInput';

let widget: any;
let idx = 0;

const widgetRegistry = {
	stack: <any[]> [],
	get(id: any): Promise<any> {
		widgetRegistry.stack.push(id);
		return Promise.resolve(widget);
	},
	identify(value: any): any {
		return '';
	},
	create<T>(factory: any, options?: any): Promise<any> {
		const w = factory(options);
		widget = w;
		return Promise.resolve([options && options.id || `widget${idx++}`, w]);
	}
};

const registryProvider: any = {
	get(type: string) {
		return type === 'widgets' ? widgetRegistry : null;
	}
};

registerSuite({
	name: 'createSearchInput',
	render() {
		const searchInput = createSearchInput({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));

		return promise.then(() => {
			const vnode = searchInput.render();

			assert.strictEqual(vnode.vnodeSelector, 'li');
			assert.strictEqual(vnode.children.length, 2);
		});
	}
});

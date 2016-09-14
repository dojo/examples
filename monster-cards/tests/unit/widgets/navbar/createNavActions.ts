import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';

import createNavActions from './../../../../src/widgets/navbar/createNavActions';

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

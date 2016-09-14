import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';

import createNavbar from './../../../../src/widgets/navbar/createNavbar';

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
	name: 'createNavbar',
	render() {
		const navbar = createNavbar({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));

		return promise.then(() => {
			const vnode = navbar.render();

			assert.strictEqual(vnode.vnodeSelector, 'header');
			assert.strictEqual(vnode.children.length, 2);
		});
	}
});

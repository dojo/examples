import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import Promise from 'dojo-shim/Promise';
import createLinkMenuItem from '../../../../src/widgets/common/createLinkMenuItem';

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

registerSuite({
	name: 'createLinkMenuItem',
	renderWithNoLabel() {
		const linkMenuItem = createLinkMenuItem({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));
		return promise.then(() => {
			const vnode = linkMenuItem.render();

			assert.strictEqual(vnode.vnodeSelector, 'li');
			assert.strictEqual(vnode.children.length, 1);
			assert.strictEqual(vnode.children[0].vnodeSelector, 'a');
			assert.strictEqual(vnode.children[0].text, undefined);
			assert.strictEqual(vnode.children[0].children.length, 0);
		});
	},

	renderWithLabel() {
		const linkMenuItem = createLinkMenuItem({
			state: {
				label: 'label'
			},
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));
		return promise.then(() => {
			const vnode = linkMenuItem.render();

			assert.strictEqual(vnode.vnodeSelector, 'li');
			assert.strictEqual(vnode.children.length, 1);
			assert.strictEqual(vnode.children[0].vnodeSelector, 'a');
			assert.strictEqual(vnode.children[0].text, 'label');
			assert.strictEqual(vnode.children[0].children, undefined);
		});
	}
});

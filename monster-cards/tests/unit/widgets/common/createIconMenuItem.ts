import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import Promise from 'dojo-shim/Promise';
import createIconMenuItem from '../../../../src/widgets/common/createIconMenuItem';

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
	name: 'createIconMenuItem',
	renderWithNoIcon() {
		const iconMenuItem = createIconMenuItem({
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));
		return promise.then(() => {
			const vnode = iconMenuItem.render();

			assert.strictEqual(vnode.vnodeSelector, 'li');
			assert.strictEqual(vnode.children.length, 1);
			assert.strictEqual(vnode.children[0].vnodeSelector, 'i');
			assert.deepEqual(vnode.children[0].properties.classes, {});
			assert.strictEqual(vnode.children[0].children.length, 0);
		});
	},

	renderWithIcon() {
		const iconMenuItem = createIconMenuItem({
			state: {
				icon: ['icon', 'icon-2' ]
			},
			registryProvider
		});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));
		return promise.then(() => {
			const vnode = iconMenuItem.render();

			assert.strictEqual(vnode.vnodeSelector, 'li');
			assert.strictEqual(vnode.children.length, 1);
			assert.strictEqual(vnode.children[0].vnodeSelector, 'i');
			assert.deepEqual(vnode.children[0].properties.classes, { icon: true, 'icon-2': true });
			assert.strictEqual(vnode.children[0].children.length, 0);
		});
	}
});

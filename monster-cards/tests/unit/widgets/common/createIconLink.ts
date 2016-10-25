import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import Promise from 'dojo-shim/Promise';
import createIconLink from '../../../../src/widgets/common/createIconLink';
import { getWidgetRegistry, getRegistryProvider } from '../../testHelper';

const registryProvider = getRegistryProvider(getWidgetRegistry());

registerSuite({
	name: 'createIconLink',
	render() {
		const iconLink = createIconLink({ state: { href: '#link' }});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
	},
	renderWitouthRef() {
		const iconLink = createIconLink({ state: {}});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
		assert.isUndefined(vnode.properties['href']);
	},
	renderWithText() {
		const iconLink = createIconLink({ state: { text: 'test' }, registryProvider});

		const promise = new Promise((resolve) => setTimeout(resolve, 10));
		return promise.then(() => {
			const vnode = iconLink.render();
			assert.strictEqual(vnode.children.length, 2);
			assert.strictEqual(vnode.children[1].vnodeSelector, 'span');
			assert.strictEqual(vnode.children[1].text, 'test');
		});
	}
});

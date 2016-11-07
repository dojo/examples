import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import createIconLink from '../../../../src/widgets/common/createIconLink';

registerSuite({
	name: 'createIconLink',
	render() {
		const iconLink = createIconLink({ state: { href: '#link' }});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
	},
	renderWithouthRef() {
		const iconLink = createIconLink({ state: {}});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
		assert.isUndefined(vnode.properties['href']);
	},
	renderWithText() {
		const iconLink = createIconLink({ state: { text: 'test' }});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.children.length, 2);
		assert.strictEqual(vnode.children[1].vnodeSelector, 'span');
		assert.strictEqual(vnode.children[1].text, 'test');
	},
	renderWithIcon() {
		const iconLink = createIconLink({ state: { iconClass: [ 'testIconClass' ]}});
		const vnode = iconLink.render();
		assert.strictEqual(vnode.children.length, 2);
		assert.strictEqual(vnode.children[0].vnodeSelector, 'i');
		assert.isTrue(vnode.children[0].properties.classes['testIconClass']);
	}
});

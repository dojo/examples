import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';

import createLink from '../../../../src/widgets/common/createLink';

registerSuite({
	name: 'createLink',
	renderWithRef() {
		const icon = createLink({ state: { href: '#link' }});

		const vnode = icon.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
		assert.strictEqual(vnode.properties['href'], '#link');
	},
	renderWitouthRef() {
		const icon = createLink();

		const vnode = icon.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
		assert.isUndefined(vnode.properties['href']);
	}
});

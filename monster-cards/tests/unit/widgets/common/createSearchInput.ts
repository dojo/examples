import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';

import createSearchInput from './../../../../src/widgets/common/createSearchInput';

registerSuite({
	name: 'createSearchInput',
	render() {
		const searchInput = createSearchInput();
		const vnode = searchInput.render();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.strictEqual(vnode.children.length, 2);
	}
});

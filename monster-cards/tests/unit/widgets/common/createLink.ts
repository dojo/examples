import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import createLink from '../../../../src/widgets/common/createLink';

registerSuite({
	name: 'createLink',
	render() {
		const icon = createLink();

		const vnode = icon.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
	}
});

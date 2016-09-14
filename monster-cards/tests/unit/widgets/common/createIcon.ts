import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import createIcon from '../../../../src/widgets/common/createIcon';

registerSuite({
	name: 'createIcon',
	render() {
		const icon = createIcon({});

		const vnode = icon.render();
		assert.strictEqual(vnode.vnodeSelector, 'i');
	}
});

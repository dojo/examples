import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import createIcon from '../../../../src/widgets/common/createIcon';

registerSuite({
	name: 'createIcon',
	render() {
		const icon = createIcon({});

		const vnode = icon.render();
		assert.strictEqual(vnode.vnodeSelector, 'i');
	}
});

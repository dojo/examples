import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';

import createImage from '../../../../src/widgets/common/createImage';

registerSuite({
	name: 'createImage',
	render() {
		const image = createImage({ state: { src: '/image.png' }});

		const vnode = image.render();
		assert.strictEqual(vnode.vnodeSelector, 'img');
		assert.strictEqual(vnode.properties.src, '/image.png');
	}
});

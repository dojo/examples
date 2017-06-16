import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';
import { spy, SinonSpy } from 'sinon';

import App from './../../src/App';

registerSuite({
	name: 'App',
	render() {
		const app = new App();
		const vnode = <VNode> app.__render__();
		assert.equal(vnode.vnodeSelector, 'div');
	}
});

import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';

import Header from '../../../src/widgets/Header';
import * as css from '../../../src/widgets/styles/Header.m.css';

registerSuite({
	name: 'Header',
	'render'() {
		// const header = new Header();
		//
		// const vnode = <VNode> header.__render__();
		// assert.strictEqual(vnode.vnodeSelector, 'div');
		// assert.equal(vnode.text, 'Hello, Dojo World!');
		// assert.deepEqual(vnode.properties!.classes, { [css.hello]: true });
	},
	'render with stranger'() {
		// const helloWorld = new Header();
		// helloWorld.__setProperties__({
		// 	stranger: true,
		// 	toggleStranger: () => {}
		// });
		//
		// const vnode = <VNode> helloWorld.__render__();
		// assert.strictEqual(vnode.vnodeSelector, 'div');
		// assert.equal(vnode.text, 'Hello, Dojo World!');
		// assert.deepEqual(vnode.properties!.classes, { [css.hello]: true, [css.upsidedown]: true });
	}
});

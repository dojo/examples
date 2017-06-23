import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from '@dojo/interfaces/vdom';

import Header from '../../../src/widgets/HackerNewsHeader';
import * as css from '../../../src/widgets/styles/hackerNewsHeader.m.css';

registerSuite({
	name: 'HackerNewsHeader',
	'render'() {
		// const header = new HackerNewsHeader();
		//
		// const vnode = <VNode> header.__render__();
		// assert.strictEqual(vnode.vnodeSelector, 'div');
		// assert.equal(vnode.text, 'Hello, Dojo World!');
		// assert.deepEqual(vnode.properties!.classes, { [css.hello]: true });
	},
	'render with stranger'() {
		// const helloWorld = new HackerNewsHeader();
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

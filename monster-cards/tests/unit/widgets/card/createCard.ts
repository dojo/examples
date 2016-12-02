import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from 'dojo-interfaces/vdom';
import createCard from '../../../../src/widgets/card/createCard';

const imageClass = 'testImageClass';
const id = 'test-card-1';

registerSuite({
	name: 'createCard',
	render() {
		const card = createCard({ state: { imageClass, id }});
		const vnode = <VNode> card.render();
		assert.strictEqual(vnode.vnodeSelector, 'a.milestoneCard');
	},
	generateCardLink() {
		const card = createCard({ state: { imageClass, id }});
		const vnode = <VNode> card.render();
		assert.strictEqual(vnode.properties!['href'], `#/cards/${id}`);
	},
	createSmallCardImage() {
		const card = createCard({ state: { imageClass, id }});
		const vnode = <VNode> card.render();
		assert.strictEqual(vnode.children!.length, 1);
		assert.strictEqual(vnode.children![0].vnodeSelector, `div.card-sprite-small.${imageClass}`);
	},
	createLargeCardImage() {
		const card = createCard({ state: { imageClass, id, large: true }});
		const vnode = <VNode> card.render();
		assert.strictEqual(vnode.children!.length, 1);
		assert.strictEqual(vnode.children![0].vnodeSelector, `div.card-sprite-large.${imageClass}`);
	}
});

import * as registerSuite from 'intern/lib/interfaces/object';
import * as assert from 'intern/chai!assert';
import createCard from '../../../../src/widgets/card/createCard';

const imageClass = 'imageClass';
const cardId = 'test-card-1';

registerSuite({
	name: 'createCard',
	render() {
		const card = createCard({ state: { imageClass, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
	},
	generateCardLink() {
		const card = createCard({ state: { imageClass, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.properties['href'], `#/cards/${cardId}`);
	},
	createCardImage() {
		const card = createCard({ state: { imageClass, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.children.length, 1);
		assert.strictEqual(vnode.children[0].vnodeSelector, 'div');
	},
	setImageSrc() {
		const card = createCard({ state: { imageClass, cardId }});
		const vnode = card.render();
		assert.isTrue(vnode.children[0].properties.classes[imageClass]);
	}
});

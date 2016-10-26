import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import createCard from '../../../../src/widgets/card/createCard';

const cardImage = 'imagePath';
const cardId = 'test-card-1';

registerSuite({
	name: 'createCard',
	render() {
		const card = createCard({ state: { cardImage, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.vnodeSelector, 'a');
	},
	generateCardLink() {
		const card = createCard({ state: { cardImage, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.properties['href'], `#/cards/${cardId}`);
	},
	createImage() {
		const card = createCard({ state: { cardImage, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.children.length, 1);
		assert.strictEqual(vnode.children[0].vnodeSelector, 'img');
	},
	setImageSrc() {
		const card = createCard({ state: { cardImage, cardId }});
		const vnode = card.render();
		assert.strictEqual(vnode.children[0].properties.src, cardImage);
	}
});

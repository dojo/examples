import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
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
		const card = createCard({ state: { cardId }});
		card.setState({ imageClass });
		const promise = new Promise((resolve) => setTimeout(resolve, 50));

		return promise.then(function () {
			const vnode = card.render();
			assert.isTrue(vnode.children[0].properties.classes[imageClass]);
		});
	}
});

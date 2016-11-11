import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import createCardSummary from '../../../../src/widgets/card/createCardSummary';

const state = {
	cardImage: 'imagePath',
	cardId: 'test-card-1',
	score: 1,
	name: 'test-name'
};

registerSuite({
	name: 'createCardSummary',
	render() {
		const cardSummary = createCardSummary();
		const vnode = cardSummary.render();
		assert.strictEqual(vnode.vnodeSelector, 'div');
		assert.strictEqual(vnode.children.length, 3);
	},
	renderCard() {
		const cardSummary = createCardSummary();
		cardSummary.setState(state);

		const promise = new Promise((resolve) => setTimeout(resolve, 50));
		return promise.then(function () {
			const vnode = cardSummary.render();
			assert.strictEqual(vnode.children[0].vnodeSelector, 'a');
			assert.strictEqual(vnode.children[0].properties['href'], `#/cards/${state.cardId}`);
		});
	},
	renderCardName() {
		const cardSummary = createCardSummary();
		cardSummary.setState(state);

		const promise = new Promise((resolve) => setTimeout(resolve, 50));
		return promise.then(function () {
			const vnode = cardSummary.render();
			assert.strictEqual(vnode.children[1].vnodeSelector, 'h2');
			assert.strictEqual(vnode.children[1].text, state.name);
		});
	},
	renderCardScore() {
		const cardSummary = createCardSummary();
		cardSummary.setState(state);

		const promise = new Promise((resolve) => setTimeout(resolve, 50));
		return promise.then(function () {
			const vnode = cardSummary.render();
			assert.strictEqual(vnode.children[2].vnodeSelector, 'p');
			assert.strictEqual(vnode.children[2].text, `milestone points: ${state.score}`);
		});
	}
});

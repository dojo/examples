import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import { VNode } from 'dojo-interfaces/vdom';
import createCardSummary from '../../../../src/widgets/card/createCardSummary';

const state = {
	cardImage: 'imagePath',
	id: 'test-card-1',
	score: 1,
	name: 'test-name'
};

registerSuite({
	name: 'createCardSummary',
	render() {
		const cardSummary = createCardSummary({ state });
		const vnode = <VNode> cardSummary.render();
		assert.strictEqual(vnode.vnodeSelector, 'div.cardSummary');
		assert.strictEqual(vnode.children!.length, 3);
	},
	renderCard() {
		const cardSummary = createCardSummary({ state });
		const vnode = <VNode> cardSummary.render();
		assert.strictEqual(vnode.children![0].vnodeSelector, 'a.milestoneCard');
		assert.strictEqual(vnode.children![0].properties!['href'], `#/cards/${state.id}`);
	},
	renderCardName() {
		const cardSummary = createCardSummary({ state });
		const vnode = <VNode> cardSummary.render();
		assert.strictEqual(vnode.children![1].vnodeSelector, 'h2');
		assert.strictEqual(vnode.children![1].properties!.innerHTML, state.name);
	},
	renderCardScore() {
		const cardSummary = createCardSummary({ state });
		const vnode = <VNode> cardSummary.render();
		assert.strictEqual(vnode.children![2].vnodeSelector, 'p.points');
		assert.strictEqual(vnode.children![2].properties!.innerHTML, `milestone points: ${state.score}`);
	}
});

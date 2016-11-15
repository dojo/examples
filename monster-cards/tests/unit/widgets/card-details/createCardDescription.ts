import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import createCardDescription from '../../../../src/widgets/card-details/createCardDescription';

const state = {
	imageClass: 'testImageClass',
	cardId: 'test-card-1',
	tagline: 'test-tagline',
	description: 'test-description',
	favouriteCount: 1,
	name: 'test-name'
};

registerSuite({
	name: 'createCardDescription',
	render() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		assert.strictEqual(vnode.vnodeSelector, 'div.animated.cardDescription');
		assert.strictEqual(vnode.children.length, 2);
	},
	renderCardImage() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		assert.strictEqual(vnode.children[0].vnodeSelector,
			`div.cardImage.card-sprite-large.${state.imageClass}`);
	},
	renderDescriptionArticle() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		assert.strictEqual(vnode.children[1].vnodeSelector, 'article');
		assert.strictEqual(vnode.children[1].children.length, 5);
	},
	rendersCardDescriptions() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		const article = vnode.children[1];

		function getInnerHTML(index: number): string {
			return article.children[index].properties.innerHTML;
		}

		assert.strictEqual(getInnerHTML(0), state.name);
		assert.strictEqual(getInnerHTML(1), state.tagline);
		assert.strictEqual(getInnerHTML(2), state.description);
		assert.include(getInnerHTML(3), state.favouriteCount.toString());
	}
});

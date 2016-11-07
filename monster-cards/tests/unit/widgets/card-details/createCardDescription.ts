import * as registerSuite from 'intern/lib/interfaces/object';
import * as assert from 'intern/chai!assert';
import createCardDescription from '../../../../src/widgets/card-details/createCardDescription';

const state = {
	imageClass: 'imageClass',
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
		assert.strictEqual(vnode.vnodeSelector, 'card-details-description');
		assert.strictEqual(vnode.children.length, 2);
	},
	renderCardImage() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		assert.strictEqual(vnode.children[0].vnodeSelector, 'div');
		assert.isTrue(vnode.children[0].properties.classes[state.imageClass]);
	},
	renderDescriptionArticle() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		assert.strictEqual(vnode.children[1].vnodeSelector, 'article');
		assert.strictEqual(vnode.children[1].children.length, 6);
	},
	rendersCardDescriptions() {
		const cardDescription = createCardDescription({ state });
		const vnode = cardDescription.render();
		const article = vnode.children[1];
		assert.strictEqual(article.children[0].text, state.name);
		assert.strictEqual(article.children[1].text, state.tagline);
		assert.strictEqual(article.children[2].text, state.description);
		assert.strictEqual(article.children[4].text, state.favouriteCount.toString());
	}
});

// import * as registerSuite from 'intern!object';
// import * as assert from 'intern/chai!assert';
// import Promise from 'dojo-shim/Promise';
// import createCard from '../../../../src/widgets/card/createCard';

// const registryProvider = getRegistryProvider(getWidgetRegistry());

// registerSuite({
// 	name: 'createCard',
// 	render() {
// 		const card = createCard({ state: { cardId: '#link' }});
// 		const promise = new Promise((resolve) => setTimeout(resolve, 10));
// 		return promise.then(() => {
// 			const vnode = card.render();
// 			assert.strictEqual(vnode.children.length, 2);
// 			assert.strictEqual(vnode.children[1].vnodeSelector, 'span');
// 			assert.strictEqual(vnode.children[1].text, 'test');
// 		});
// 	},
// 	renderWitouthRef() {
// 		const card = createCard({ state: {}});
// 		const vnode = card.render();
// 		assert.strictEqual(vnode.vnodeSelector, 'a');
// 		assert.isUndefined(vnode.properties['href']);
// 	},
// 	renderWithText() {
// 		const card = createCard({ state: { text: 'test' }, registryProvider});

// 		const promise = new Promise((resolve) => setTimeout(resolve, 10));
// 		return promise.then(() => {
// 			const vnode = card.render();
// 			assert.strictEqual(vnode.children.length, 2);
// 			assert.strictEqual(vnode.children[1].vnodeSelector, 'span');
// 			assert.strictEqual(vnode.children[1].text, 'test');
// 		});
// 	},
// 	renderWithIcon() {
// 		const card = createCard({ state: { iconClass: 'testIconClass' }, registryProvider});

// 		const promise = new Promise((resolve) => setTimeout(resolve, 10));
// 		return promise.then(() => {
// 			const vnode = card.render();
// 			console.dir(vnode.children);
// 			assert.strictEqual(vnode.children.length, 2);
// 			assert.strictEqual(vnode.children[0].vnodeSelector, 'i');
// 			assert.strictEqual(vnode.children[0].properties.classes, { 'icon': true, 'testIconClass': true });
// 		});
// 	}
// });

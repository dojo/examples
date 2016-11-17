import * as registerSuite from 'intern/lib/interfaces/object';
import { assert } from 'chai';
import createNavbar, { NavBarLinkDefinition } from './../../../../src/widgets/navbar/createNavbar';

function getSections(length: number): NavBarLinkDefinition[] {
	const sections: NavBarLinkDefinition[] = [];
	for (let i = 0; i < length; i += 1) {
		sections.push({ text: `text${i}`, href: `href${i}`});
	}
	return sections;
};

registerSuite({
	name: 'createNavbar',
	'Should render with two sub lists'() {
		const navbar = createNavbar({ state: { sections: [] } });
		const vnode = navbar.render();

		assert.strictEqual(vnode.vnodeSelector, 'header.navbar');
		assert.strictEqual(vnode.children.length, 2);
		assert.include(vnode.children[0].vnodeSelector, 'ul');
		assert.include(vnode.children[1].vnodeSelector, 'ul');
	},
	'Should render a home link'() {
		const sections = getSections(0);
		const navbar = createNavbar({ state: { sections } });
		const vnode = navbar.render();

		const sectionList = vnode.children[0];
		assert.strictEqual(sectionList.children.length, 1);
		assert.strictEqual(sectionList.children[0].children[0].vnodeSelector, 'a');
		assert.strictEqual(sectionList.children[0].children[0].properties['href'], '#');
	},
	'Should render a link for each section passed in state'() {
		const numSections = 2;
		const sections = getSections(numSections);
		const navbar = createNavbar({ state: { sections } });
		const vnode = navbar.render();

		const sectionList = vnode.children[0];
		assert.strictEqual(sectionList.children.length, numSections + 1);
	},
	'Should render text and a href for each section'() {
		const sections = getSections(1);
		const navbar = createNavbar({ state: { sections } });
		const vnode = navbar.render();

		const sectionList = vnode.children[0];
		const sectionItem = sectionList.children[1];
		const sectionLink = sectionItem.children[0];

		assert.strictEqual(sectionItem.vnodeSelector, 'li');
		assert.strictEqual(sectionLink.vnodeSelector, 'a');
		assert.strictEqual(sectionLink.properties['href'], 'href0');
		assert.strictEqual(sectionLink.properties['innerHTML'], 'text0');
	}
});

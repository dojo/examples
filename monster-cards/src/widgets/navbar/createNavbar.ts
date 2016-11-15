import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createSearchInput from '../common/createSearchInput';

export type NavBarState = {
	sections: NavBarLinkDefinition[];
}

export type NavBar = Widget<NavBarState>

export type NavBarLinkDefinition = {
	text: string;
	href: string;
}

function listItem(childNode: DNode): DNode {
	return d('li', {}, [ childNode ]);
}

function createNavBarLink({ text: innerHTML, href }: NavBarLinkDefinition): DNode {
	return listItem(d('a', { href, innerHTML }));
}

const createNavbar = createWidgetBase.extend({
	tagName: 'header',
	classes: [ 'navbar' ],
	childNodeRenderers: [
		function(this: NavBar): DNode[] {
			const homeLink = listItem(d('a', { href: '#' }, [
				d('img', { src: 'images/navbar-app-icon.png' })
			]));
			const sectionLinks = this.state.sections.map(createNavBarLink);
			const searchAction = listItem(d(createSearchInput, {}));
			const favouriteAction = listItem(d('i.fa.fa-2x.fa-heart-o'));

			const pageLinks = d('ul.inline-list', {}, [ homeLink, ...sectionLinks ]);
			const actionLinks = d('ul.inline-list.pull-right', {}, [ searchAction, favouriteAction ]);

			return [ pageLinks, actionLinks ];
		}
	]
});

export default createNavbar;

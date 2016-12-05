import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';
import createSearchInput from '../common/createSearchInput';

export type NavBarState = WidgetState & {
	sections: NavBarLinkDefinition[];
}

export type NavBar = Widget<NavBarState>

export type NavBarLinkDefinition = {
	text: string;
	href: string;
}

let counter = 0;

function listItem(childNode: DNode, key?: any): DNode {
	const options = key ? { key } : {};
	return d('li', options, [ childNode ]);
}

function createNavBarLink({ text: innerHTML, href }: NavBarLinkDefinition): DNode {
	return listItem(d('a', { key: counter++, href, innerHTML }), innerHTML);
}

const createNavbar = createWidgetBase.mixin({
	mixin: {
		tagName: 'header',
		classes: [ 'navbar' ],
		getChildrenNodes: function(this: NavBar): DNode[] {
			const { state } = this;
			const isReady = Object.keys(state).length > 0;

			const homeLink = listItem(d('a', { href: '#' }, [
				d('img', { src: 'images/navbar-app-icon.png' })
			]));
			const sectionLinks = isReady ? this.state.sections.map(createNavBarLink) : [ d('li', { key: 'dummy' }) ];
			const searchAction = listItem(d(createSearchInput, {}));
			const favouriteAction = listItem(d('i.fa.fa-2x.fa-heart-o'));

			const pageLinks = d('ul.inline-list', {}, [ homeLink, ...sectionLinks ]);
			const actionLinks = d('ul.inline-list.pull-right', {}, [ searchAction, favouriteAction ]);

			return [ pageLinks, actionLinks ];
		}
	}
});

export default createNavbar;

import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createSearchInput from '../common/createSearchInput';

export type NavBarState = {}

export type NavBar = Widget<NavBarState>

const createNavbar = createWidgetBase.extend({
	tagName: 'header',
	childNodeRenderers: [
		function(this: NavBar): DNode[] {
			return [
				d('ul.inline-list', {}, [
					d('li', {}, [
						d('a', { href: '#' }, [
							d('img', { src: 'images/navbar-app-icon.png' })
						])
					]),
					d('li', {}, [
						d('a', { href: '#cards', innerHTML: 'the cards'})
					]),
					d('li', {}, [
						d('a', { href: '#gameplay', innerHTML: 'gameplay'})
					]),
					d('li', {}, [
						d('a', { href: '#about', innerHTML: 'about'})
					])
				]),
				d('ul.inline-list.pull-right', {}, [
					d('li.search', {}, [
						d(createSearchInput, {})
					]),
					d('li', {}, [
						d('i.fa.fa-2x.fa-heart-o')
					])
				])
			];
		}
	]
});

export default createNavbar;

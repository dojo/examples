import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions }  from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import { Child } from 'dojo-widgets/mixins/interfaces';

import createIconMenuItem from './../common/createIconMenuItem';
import createLinkMenuItem from './../common/createLinkMenuItem';

interface NavMenuState extends WidgetState, StatefulChildrenState {}

export interface NavMenuOptions extends WidgetOptions<NavMenuState>, StatefulChildrenOptions<Child, NavMenuState> { }

export type NavMenu = Widget<NavMenuState>;

export interface NavMenuFactory extends ComposeFactory<NavMenu, NavMenuOptions> { }

const createNavMenu: NavMenuFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance
				.createChildren({
					appIcon: {
						factory: createIconMenuItem,
						options: {
							state: {
								icon: [ 'fa', 'fa-2x', 'fa-optin-monster' ]
							}
						}
					},
					cardsLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#cards',
								label: 'The Cards'
							}
						}
					},
					gameLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#game',
								label: 'The Game'
							}
						}
					},
					aboutLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#about',
								label: 'About'
							}
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'ul'
	});

export default createNavMenu;

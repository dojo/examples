import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { CreateChildrenResults } from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createIconMenuItem from './../common/createIconMenuItem';
import createLinkMenuItem from './../common/createLinkMenuItem';

export type NavMenu = Widget<WidgetState>;

export interface NavMenuFactory extends ComposeFactory<NavMenu, WidgetOptions<WidgetState>> { }

interface ChildItem {
	id: string;
	widget: Widget<WidgetState>;
}

interface NavMenuChildren extends CreateChildrenResults<Widget<WidgetState>> {
	appIcon: ChildItem;
	cardsLink: ChildItem;
	gameLink: ChildItem;
	aboutLink: ChildItem;
}

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
								label: 'The Cards'
							}
						}
					},
					gameLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								label: 'The Game'
							}
						}
					},
					aboutLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
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

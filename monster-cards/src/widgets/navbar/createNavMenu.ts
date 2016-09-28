import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createImageMenuItem from './../common/createImageMenuItem';
import createLinkMenuItem from './../common/createLinkMenuItem';

const createNavMenu = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					appIcon: {
						factory: createImageMenuItem,
						options: {
							state: {
								src: 'images/navbar-app-icon.png'
							}
						}
					},
					cardsLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#cards',
								label: 'THE CARDS'
							}
						}
					},
					gameLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#gameplay',
								label: 'GAMEPLAY'
							}
						}
					},
					aboutLink: {
						factory: createLinkMenuItem,
						options: {
							state: {
								href: '#about',
								label: 'ABOUT'
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

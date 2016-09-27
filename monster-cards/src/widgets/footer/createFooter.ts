import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createFooterIcons from './createFooterIcons';
import createImage from './../common/createImage';

const createFooter = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					navMenu: {
						factory: createFooterIcons,
						options: {
							state: {
								classes: [ 'inline-list' , 'pull-left' ]
							}
						}
					},
					navActions: {
						factory: createImage,
						options: {
							state: {
								src: 'images/dojo_logo.png'
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
		tagName: 'footer'
	});

export default createFooter;

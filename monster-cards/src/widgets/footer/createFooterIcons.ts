import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin  from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createIconMenuItem from './../common/createIconMenuItem';

const createFooterIcons = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					facebookIcon: {
						factory: createIconMenuItem,
						options: {
							state: {
								icon: [ 'fa', 'fa-facebook-official' ]
							}
						}
					},
					twitterIcon: {
						factory: createIconMenuItem,
						options: {
							state: {
								icon: [ 'fa', 'fa-twitter' ]
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

export default createFooterIcons;

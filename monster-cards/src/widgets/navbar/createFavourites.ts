import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createContainer from './../common/createContainer';
import createIcon from './../common/createIcon';

const createNavActions = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					favIcon: {
						factory: createIcon,
						options: {
							state: {
								classes: [ 'fa', 'fa-2x', 'fa-heart-o' ]
							}
						}
					},
					favCards: {
						factory: createContainer,
						options: {
							id: 'fav-container'
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'li'
	});

export default createNavActions;

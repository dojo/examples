import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createNav from './createNav';
// import createJumbotron from './createJumbotron';

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					navMenu: {
						factory: createNav,
						options: {
							state: {
								classes: [ 'inline-list' ]
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
		tagName: 'card-details'
	});

export default create;

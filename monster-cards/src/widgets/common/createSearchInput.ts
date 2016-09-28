import createTextInput from 'dojo-widgets/createTextInput';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createIcon from './createIcon';

const createSearchInput = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					searchInput: {
						factory: createTextInput,
						options: {
							type: 'search'
						}
					},
					searchIcon: {
						factory: createIcon,
						options: {
							state: {
								classes: [ 'fa', 'fa-search' ]
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
		tagName: 'li'
	});

export default createSearchInput;

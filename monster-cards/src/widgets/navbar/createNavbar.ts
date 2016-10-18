import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createNavMenu from './createNavMenu';
import createNavActions from './createNavActions';
import css from '../../styles/structural/modules/Navbar';

const createNavbar = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance) {
			instance
				.createChildren({
					navMenu: {
						factory: createNavMenu,
						options: {
							state: {
								classes: [ 'inline-list' ]
							}
						}
					},
					navActions: {
						factory: createNavActions,
						options: {
							state: {
								classes: [ 'inline-list', 'pull-right' ]
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
		tagName: 'header',
		classes: [ css.navbar ]
	});

export default createNavbar;

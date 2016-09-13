import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import createSearchInput from './../common/createSearchInput';
import createIconMenuItem from './../common/createIconMenuItem';

export type NavActions = Widget<WidgetState>;

export interface NavActionsFactory extends ComposeFactory<NavActions, WidgetOptions<WidgetState>> { }

const createNavActions: NavActionsFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance.createChildren({
				searchInput: {
					factory: createSearchInput,
					options: {
						state: {
							classes: [ 'search' ]
						}
					}
				},
				favIcon: {
					factory: createIconMenuItem,
					options: {
						state: {
							icon: [ 'fa', 'fa-2x', 'fa-heart-o' ]
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

export default createNavActions;

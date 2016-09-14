import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions }  from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import { Child } from 'dojo-widgets/mixins/interfaces';

import createSearchInput from './../common/createSearchInput';
import createIconMenuItem from './../common/createIconMenuItem';

interface NavActionsState extends WidgetState, StatefulChildrenState {}

export interface NavActionsOptions extends WidgetOptions<NavActionsState>, StatefulChildrenOptions<Child, NavActionsState> { }

export type NavActions = Widget<NavActionsState>;

export interface NavActionsFactory extends ComposeFactory<NavActions, NavActionsOptions> { }

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

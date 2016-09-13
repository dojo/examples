import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildren,  StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createIcon from './createIcon';

interface IconMenuItemState extends WidgetState, StatefulChildrenState {
	icon?: string[];
}

export interface IconMenuItemOptions extends WidgetOptions<IconMenuItemState>, StatefulChildrenOptions<Child, IconMenuItemState> { }

export type IconMenuItem = Widget<IconMenuItemState> & StatefulChildren<Child, IconMenuItemState>;

export interface IconMenuItemFactory extends ComposeFactory<IconMenuItem, IconMenuItemOptions> { }

const createIconMenuItem: IconMenuItemFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: IconMenuItem, options: IconMenuItemOptions) {
			const classes = options && options.state && options.state.icon || [];
			instance.createChildren({
				icon: {
					factory: createIcon,
					options: {
						state: { classes }
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

export default createIconMenuItem;

import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildren,  StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createIcon from './createIcon';

type IconMenuItemState = RenderMixinState & StatefulChildrenState & {
	icon?: string[];
};

type IconMenuItemOptions = RenderMixinOptions<IconMenuItemState> & StatefulChildrenOptions<Child, IconMenuItemState>;

type IconMenuItem = RenderMixin<IconMenuItemState> & StatefulChildren<Child>;

const createIconMenuItem = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: IconMenuItem, options: IconMenuItemOptions) {
			const classes = options && options.state && options.state.icon || [];
			instance
				.createChild(createIcon, { state: { classes } })
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'li'
	});

export default createIconMenuItem;

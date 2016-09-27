import { ComposeFactory } from 'dojo-compose/compose';
import createRenderableChildrenMixin, { RenderableChildrenMixin, RenderableChildrenOptions } from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildren, StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createLink, { LinkState } from './createLink';

type LinkMenuItemState = LinkState & StatefulChildrenState;

type LinkMenuItemOptions = RenderMixinOptions<LinkMenuItemState> & RenderableChildrenOptions & StatefulChildrenOptions<Child, LinkMenuItemState>;

type LinkMenuItem = RenderMixin<LinkMenuItemState> & RenderableChildrenMixin & StatefulChildren<Child>;

type LinkMenuItemFactory = ComposeFactory<LinkMenuItem, LinkMenuItemOptions>;

const createLinkMenuItem: LinkMenuItemFactory = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: LinkMenuItem, { state }: LinkMenuItemOptions = {}) {
			instance
				.createChild(createLink, { state })
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'li'
	});

export default createLinkMenuItem;

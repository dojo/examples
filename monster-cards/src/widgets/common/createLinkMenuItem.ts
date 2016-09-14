import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildren, StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createLink, { LinkState } from './createLink';

interface LinkMenuItemState extends LinkState, StatefulChildrenState {}

export interface LinkMenuItemOptions extends WidgetOptions<LinkMenuItemState>, StatefulChildrenOptions<Child, LinkMenuItemState> { }

export type LinkMenuItem = Widget<WidgetState> & StatefulChildren<Child, LinkMenuItemState>;

export interface LinkMenuItemFactory extends ComposeFactory<LinkMenuItem, LinkMenuItemOptions> { }

const createLinkMenuItem: LinkMenuItemFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: LinkMenuItem, options: LinkMenuItemOptions) {
			const state: LinkMenuItemState = options && options.state || undefined;

			instance.createChild(createLink, { state }).then(() => {
				instance.invalidate();
			});
		}
	})
	.extend({
		tagName: 'li'
	});

export default createLinkMenuItem;

import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildren, StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createLink from './createLink';

interface LinkMenuItemState extends WidgetState, StatefulChildrenState {}

export interface LinkMenuItemOptions extends WidgetOptions<LinkMenuItemState>, StatefulChildrenOptions<Child, LinkMenuItemState> { }

export type LinkMenuItem = Widget<WidgetState> & StatefulChildren<Child, LinkMenuItemState>;

export interface LinkMenuItemFactory extends ComposeFactory<LinkMenuItem, LinkMenuItemOptions> { }

const createLinkMenuItem: LinkMenuItemFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: LinkMenuItem, options: LinkMenuItemOptions) {
			const classes = options && options.state && options.state.classes || [];
			const label = options && options.state && options.state.label || undefined;

			instance.createChild(createLink, { state: { classes, label } }).then(() => {
				instance.invalidate();
			});
		}
	})
	.extend({
		tagName: 'li'
	});

export default createLinkMenuItem;

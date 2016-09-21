import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions }  from 'dojo-widgets/mixins/createStatefulChildrenMixin';

import { Child } from 'dojo-widgets/mixins/interfaces';

import createIconMenuItem from './../common/createIconMenuItem';

interface FooterIconsState extends WidgetState, StatefulChildrenState {}

export interface FooterIconsOptions extends WidgetOptions<FooterIconsState>, StatefulChildrenOptions<Child, FooterIconsState> { }

export type FooterIcons = Widget<FooterIconsState>;

export interface FooterIconsFactory extends ComposeFactory<FooterIcons, FooterIconsOptions> { }

const createFooterIcons: FooterIconsFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance
				.createChildren({
					facebookIcon: {
						factory: createIconMenuItem,
						options: {
							state: {
								icon: [ 'fa', 'fa-facebook-official' ]
							}
						}
					},
					twitterIcon: {
						factory: createIconMenuItem,
						options: {
							state: {
								icon: [ 'fa', 'fa-twitter' ]
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

export default createFooterIcons;

import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createFooterIcons from './createFooterIcons';
import createImage from './../common/createImage';

interface FooterState extends WidgetState, StatefulChildrenState { }

export interface FooterOptions extends WidgetOptions<FooterState>, StatefulChildrenOptions<Child, FooterState> { }

export type Footer = Widget<FooterState>;

export interface FooterFactory extends ComposeFactory<Footer, FooterOptions> { }

const createFooter: FooterFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance
				.createChildren({
					navMenu: {
						factory: createFooterIcons,
						options: {
							state: {
								classes: [ 'inline-list' , 'pull-left' ]
							}
						}
					},
					navActions: {
						factory: createImage,
						options: {
							state: {
								src: 'images/sitepen.png'
							}
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	}).extend({
		tagName: 'footer'
	});

export default createFooter;

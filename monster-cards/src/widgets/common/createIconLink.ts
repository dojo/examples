import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createIcon from './createIcon';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type IconLinkState = RenderMixinState & StatefulChildrenState & {
	href?: string;
	iconClass?: string;
	text?: string;
}

type IconLinkOptions = RenderMixinOptions<IconLinkState> & StatefulChildrenOptions<Child, IconLinkState>;

export type IconLink = RenderMixin<IconLinkState> & StatefulChildren<Child>;

type IconLinkFactory = ComposeFactory<IconLink, IconLinkOptions>;

const createIconLink: IconLinkFactory = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: IconLink, options: IconLinkOptions) {
			instance
				.createChildren({
					icon: {
						factory: createIcon,
						options: {
							state: {
								classes: options.state.iconClass
							}
						}
					},
					text: {
						factory: createWidget,
						options: {
							tagName: 'span',
							state: {
								label: options.state.text
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
		nodeAttributes: [
			function (this: IconLink): VNodeProperties {
				const { href } = this.state;
				return href ? { href } : {};
			}
		],
		tagName: 'a'
	});

export default createIconLink;

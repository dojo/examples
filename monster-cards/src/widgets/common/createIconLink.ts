import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createIcon from './createIcon';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type LinkState = RenderMixinState & StatefulChildrenState & {
	href?: string;
	iconClass?: string;
	text?: string;
}

type LinkOptions = RenderMixinOptions<LinkState>;

export type Link = RenderMixin<LinkState> & StatefulChildren<Child>;

type LinkFactory = ComposeFactory<Link, LinkOptions>;

const createIconLink: LinkFactory = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: Link, options: LinkOptions) {
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
			function (this: Link): VNodeProperties {
				const { href } = this.state;
				return href ? { href } : {};
			}
		],
		tagName: 'a'
	});

export default createIconLink;

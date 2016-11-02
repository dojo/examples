import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';
import createParentListMixin, { ParentListMixin, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createIcon from './createIcon';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type IconLinkState = RenderMixinState & {
	href?: string;
	iconClass?: string[];
	text?: string;
}

type IconLinkOptions = RenderMixinOptions<IconLinkState> & ParentListMixinOptions<Child>;

export type IconLink = RenderMixin<IconLinkState> & ParentListMixin<Child>;

type IconLinkFactory = ComposeFactory<IconLink, IconLinkOptions>;

const createIconLink: IconLinkFactory = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createParentListMixin,
		initialize(instance: IconLink, options: IconLinkOptions) {
			const icon = createIcon({
				state: {
					classes: options.state.iconClass
				}
			});
			const text = createWidget({
				tagName: 'span',
				state: {
					label: options.state.text
				}
			});

			instance.append([ icon, text ]);
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

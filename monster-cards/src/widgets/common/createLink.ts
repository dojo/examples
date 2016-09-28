import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';

export type LinkState = RenderMixinState & {
	href?: string;
}

type LinkOptions = RenderMixinOptions<LinkState>;

export type Link = RenderMixin<LinkState>;

type LinkFactory = ComposeFactory<Link, LinkOptions>;

const createLink: LinkFactory = createRenderMixin
	.extend({
		nodeAttributes: [
			function (this: Link): VNodeProperties {
				const { href } = this.state;
				return href ? { href } : {};
			}
		],

		tagName: 'a'
	});

export default createLink;

import { ComposeFactory } from 'dojo-compose/compose';
import createI18nMixin from 'dojo-widgets/mixins/createI18nMixin';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';

import bundle from './../../nls/main';

export type LinkState = RenderMixinState & {
	href?: string;
}

type LinkOptions = RenderMixinOptions<LinkState>;

export type Link = RenderMixin<LinkState>;

type LinkFactory = ComposeFactory<Link, LinkOptions>;

const createLink: LinkFactory = createRenderMixin
	.mixin(createI18nMixin)
	.extend({
		nodeAttributes: [
			function (this: Link): VNodeProperties {
				const { href } = this.state;
				return href ? { href } : {};
			}
		],

		bundles: [ bundle ],
		tagName: 'a'
	});

export default createLink;

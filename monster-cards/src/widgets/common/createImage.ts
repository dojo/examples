import { ComposeFactory } from 'dojo-compose/compose';
import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import { VNodeProperties } from 'maquette';

export type ImageState = RenderMixinState & {
	src?: string;
};

export type ImageOptions = RenderMixinOptions<ImageState>;

type Image = RenderMixin<ImageState>;

type ImageFactory = ComposeFactory<Image, ImageOptions>;

const createImage: ImageFactory = createRenderMixin
	.extend({
		nodeAttributes: [
			function (this: Image): VNodeProperties {
				const { src } = this.state;
				return src ? { src } : {};
			}
		],

		tagName: 'img'
	});

export default createImage;

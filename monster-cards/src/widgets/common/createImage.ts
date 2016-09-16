import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import { VNodeProperties } from 'maquette';
import createCachedRenderMixin from 'dojo-widgets/mixins/createCachedRenderMixin';

export interface ImageState extends WidgetState {
	src?: string;
}

export interface ImageOptions extends WidgetOptions<ImageState> { }

export type Image = Widget<ImageState>;

export interface ImageFactory extends ComposeFactory<Image, ImageOptions> { }

const createImage: ImageFactory = createWidget
	.mixin({
		mixin: createCachedRenderMixin,
		aspectAdvice: {
			before: {
				getNodeAttributes(this: Image, overrides: VNodeProperties = {}): VNodeProperties[] {
					if (this.state.src !== undefined) {
						overrides.src = this.state.src;
					}

					return [ overrides ];
				}
			}
		}
	})
	.extend({
		tagName: 'img'
	});

export default createImage;

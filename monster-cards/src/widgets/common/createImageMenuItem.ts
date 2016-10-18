import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createImage, { ImageState, ImageOptions } from './createImage';
import css from '../../styles/structural/modules/ImageMenuItem';

type ImageMenuItem = RenderMixin<ImageState> & StatefulChildren<Child>;

const createImageMenuItem = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: ImageMenuItem, options: ImageOptions) {
			const { state } = options;
			instance
				.createChild(createImage, { state })
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'li',
		classes: [ css.logo ]
	});

export default createImageMenuItem;

import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createImage from '../common/createImage';
import { VNodeProperties } from 'maquette';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardState = RenderMixinState & StatefulChildrenState & {
	name: string;
	tagline: string;
	description: string;
	cardImage: string;
	favouriteCount: number;
	cardId: string;
}

type CardOptions = RenderMixinOptions<CardState>;

export type Card = RenderMixin<CardState> & StatefulChildren<Child>;

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: Card, options: CardOptions) {
			instance
				.createChildren({
					image: {
						factory: createImage,
						options: {
							state: {
								src: options.state.cardImage
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
			function (this: Card): VNodeProperties {
				return {
					href: `#/cards/${this.state.cardId}`
				};
			}
		],
		classes: [ 'milestoneCard' ],
		tagName: 'a'
	});

export default create;

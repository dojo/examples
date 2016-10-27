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
	large?: boolean;
}

type CardOptions = RenderMixinOptions<CardState>;

export type Card = RenderMixin<CardState> & StatefulChildren<Child>;

const imagePath = {
	small: '/images/cards/small/',
	large: '/images/cards/large/'
};

const createCard = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: Card, options: CardOptions) {
			const baseSrc = options.state.large ? imagePath.large : imagePath.small;
			instance
				.createChildren({
					image: {
						factory: createImage,
						options: {
							state: {
								src: baseSrc + options.state.cardImage
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

export default createCard;

import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createWidget from 'dojo-widgets/createWidget';
import { VNodeProperties } from 'maquette';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardState = RenderMixinState & StatefulChildrenState & {
	name: string;
	tagline: string;
	description: string;
	imageClass: string;
	favouriteCount: number;
	cardId: string;
	large?: boolean;
}

type CardOptions = RenderMixinOptions<CardState>;

export type Card = RenderMixin<CardState> & StatefulChildren<Child>;

const createCard = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: Card, options: CardOptions) {
			const baseImageClass = options.state.large ? 'cardImageLarge' : 'cardImageSmall';
			instance
				.createChildren({
					image: {
						factory: createWidget,
						options: {
							tagName: 'div',
							state: {
								classes: [ baseImageClass, options.state.imageClass ]
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

import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createParentListMixin, { ParentListMixin, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createImage from '../common/createImage';
import { VNodeProperties } from 'maquette';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardState = RenderMixinState & {
	cardImage: string;
	cardId: string;
	large?: boolean;
}

type CardOptions = RenderMixinOptions<CardState> & ParentListMixinOptions<Child>;

export type Card = RenderMixin<CardState> & ParentListMixin<Child>;

const createCard = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createParentListMixin,
		initialize(instance: Card, options: CardOptions) {
			const image = createImage({
				state: {
					src: options.state.cardImage
				}
			});

			instance.append([ image ]);
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

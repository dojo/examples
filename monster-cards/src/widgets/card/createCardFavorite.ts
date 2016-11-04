import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createCard from './createCard';
import createWidget from 'dojo-widgets/createWidget';
import createButton from 'dojo-widgets/createButton';
import { Child } from 'dojo-widgets/mixins/interfaces';

import { unfavoriteCard } from './../../actions/userActions';

export type CardFavoriteState = RenderMixinState & StatefulChildrenState & {
	name: string;
	cardImage: string;
	score: number;
	id: string;
	cardId: string;
}

type CardFavoriteOptions = RenderMixinOptions<CardFavoriteState>;

export type CardFavorite = RenderMixin<CardFavoriteState> & StatefulChildren<Child>;

const createCardFavorite = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: CardFavorite, options: CardFavoriteOptions) {
			instance
				.createChildren({
					card: {
						factory: createCard,
						options: {
							state: {
								cardId: options.state.cardId,
								cardImage: options.state.cardImage
							}
						}
					},
					name: {
						factory: createWidget,
						options: {
							state: {
								label: options.state.name
							},
							tagName: 'h2'
						}
					},
					button: {
						factory: createButton,
						options: {
							listeners: {
								click: () => { unfavoriteCard.do(options.state); }
							},
							state: {
								classes: [ 'destroy' ]
							}
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	}).extend({
		classes: [ 'cardFavorite' ],
		tagName: 'li'
	});

export default createCardFavorite;

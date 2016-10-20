import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createCard from './createCard';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardSummaryState = RenderMixinState & StatefulChildrenState & {
	name: string;
	cardImage: string;
	score: number;
	id: string;
	cardId: string;
}

type CardSummaryOptions = RenderMixinOptions<CardSummaryState>;

export type CardSummary = RenderMixin<CardSummaryState> & StatefulChildren<Child>;

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: CardSummary, options: CardSummaryOptions) {
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
					score: {
						factory: createWidget,
						options: {
							state: {
								classes: [ 'points' ],
								label: `milestone points: ${options.state.score}`
							},
							tagName: 'p'
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	}).extend({
		classes: [ 'cardSummary' ]
	});

export default create;

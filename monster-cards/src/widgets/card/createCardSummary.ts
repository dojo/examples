import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createParentListMixin, { ParentListMixin, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createCard from './createCard';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type CardSummaryState = RenderMixinState & {
	name: string;
	imageClass: string;
	score: number;
	cardId: string;
}

type CardSummaryOptions = RenderMixinOptions<CardSummaryState> & ParentListMixinOptions<Child>;

export type CardSummary = RenderMixin<CardSummaryState> & ParentListMixin<Child>;

const createCardSummary = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createParentListMixin,
		initialize(instance: CardSummary, options: CardSummaryOptions) {
			const card = createCard({
				state: {
					cardId: options.state.cardId,
					imageClass: options.state.imageClass,
					large: true
				}
			});
			const name = createWidget({
				state: {
					label: options.state.name
				},
				tagName: 'h2'
			});
			const score = createWidget({
				state: {
					classes: [ 'points' ],
					label: `milestone points: ${options.state.score}`
				},
				tagName: 'p'
			});
			instance.append([ card, name, score ]);
		}
	}).extend({
		classes: [ 'cardSummary' ]
	});

export default createCardSummary;

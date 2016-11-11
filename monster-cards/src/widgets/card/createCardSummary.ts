import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createParentListMixin, { ParentListMixin, ParentListMixinOptions } from 'dojo-widgets/mixins/createParentListMixin';
import createCard from './createCard';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';
import { assign } from 'dojo-core/lang';

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
					large: true
				}
			});
			const name = createWidget({
				tagName: 'h2'
			});
			const score = createWidget({
				state: {
					classes: [ 'points' ]
				},
				tagName: 'p'
			});

			instance.append([ card, name, score ]);

			instance.on('statechange', () => {
				card.setState({
					cardId: instance.state.cardId,
					imageClass: instance.state.imageClass
				});

				name.setState({
					label: instance.state.name
				});

				score.setState(assign(score.state, {
					label: `milestone points: ${instance.state.score}`
				}));
			});
		}
	}).extend({
		classes: [ 'cardSummary' ]
	});

export default createCardSummary;

import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import { CardState } from '../card/createCard';
import createCardDescription, { CardDescriptionState } from './createCardDescription';
import createCardNavBar from './createCardNavBar';
import createSeenWith from './createSeenWith';
import d from 'dojo-widgets/util/d';
import { assign } from 'dojo-core/lang';

export type CardDetailsPageState = WidgetState & {
	cards: CardState[];
	cardDescription: CardDescriptionState;
	seenWith: CardState[];
}
export type CardDetailsPage = Widget<CardDetailsPageState>

const createCardDetailsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		classes: [ 'animated', 'pageHolder', 'cardDetails' ],
		childNodeRenderers: [
			function(this: CardDetailsPage): DNode[] {
				const { cards, cardDescription, seenWith } = this.state;

				const cardNavBar = d(createCardNavBar, { state: { cards }});

				const descriptionState = assign({
					enterAnimation: 'slideInRight',
					exitAnimation: 'slideOutLeft'
				}, cardDescription);

				const cardDescriptionView = d(createCardDescription, {
					id: `card-details-description-${cardDescription.id}`,
					state: descriptionState
				});

				const jumbotron = d('div.jumbotron', {} , [ cardDescriptionView ]);

				const seenWithView = d(createSeenWith, { state: { cards: seenWith }});

				return [ cardNavBar, jumbotron, seenWithView ];
			}
		]
	});

export default createCardDetailsPage;

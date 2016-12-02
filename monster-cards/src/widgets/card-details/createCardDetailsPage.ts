import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import { CardState } from '../card/createCard';
import createCardDescription, { CardDescriptionState } from './createCardDescription';
import createCardNavBar from './createCardNavBar';
import createSeenWith from './createSeenWith';
import d from 'dojo-widgets/d';
import { assign } from 'dojo-core/lang';

export type CardDetailsPageState = WidgetState & {
	cards: CardState[];
	cardDescription: CardDescriptionState;
	seenWith: CardState[];
}
export type CardDetailsPage = Widget<CardDetailsPageState>

const createCardDetailsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'pageHolder', 'cardDetails' ],
			getChildrenNodes: function(this: CardDetailsPage): DNode[] {
				const { cards, cardDescription, seenWith } = this.state;

				const cardNavBar = d(createCardNavBar, { state: { cards }});

				const descriptionState = assign({
					enterAnimation: 'slideInRight',
					exitAnimation: 'slideOutLeft'
				}, cardDescription);

				const cardDescriptionView = cardDescription ? d(createCardDescription, {
					id: `card-details-description-${cardDescription.id}`,
					state: descriptionState
				}) : null;

				const jumbotron = d('div.jumbotron', {} , [ cardDescriptionView ]);

				const seenWithView = d(createSeenWith, { state: { cards: seenWith }});

				return [ cardNavBar, jumbotron, seenWithView ];
			}
		}
	});

export default createCardDetailsPage;

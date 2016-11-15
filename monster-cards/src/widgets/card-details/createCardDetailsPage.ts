import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import { CardState } from '../card/createCard';
import createCardDescription, { CardDescriptionState } from './createCardDescription';
import createCardNavBar from './createCardNavBar';
import d from 'dojo-widgets/util/d';
import { assign } from 'dojo-core/lang';

export type CardDetailsPageState = WidgetState & {
	cards: CardState[];
	cardDescription: CardDescriptionState;
}
export type CardDetailsPage = Widget<CardDetailsPageState>

const createCardDetailsPage = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		classes: [ 'animated', 'pageHolder', 'cardDetails' ],
		childNodeRenderers: [
			function(this: CardDetailsPage): DNode[] {
				const { cards, cardDescription } = this.state;

				const cardNavBar = d(createCardNavBar, { state: { cards }});

				const descriptionState = assign({
					enterAnimation: 'slideInRight',
					exitAnimation: 'slideOutLeft'
				}, cardDescription);

				const cardDescriptionView = d(createCardDescription, {
					id: cardDescription.id,
					state: descriptionState
				});

				const jumbotron = d('div.jumbotron', {} , [ cardDescriptionView ]);

				return [ cardNavBar, jumbotron ];
			}
		]
	});

export default createCardDetailsPage;

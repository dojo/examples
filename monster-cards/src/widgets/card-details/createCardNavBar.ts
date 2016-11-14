import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createCard, { CardState } from '../card/createCard';

export type CardNavBarState = {
	cards: CardState[];
}

export type CardNavBar = Widget<CardNavBarState>;

const createCardNavBar = createWidgetBase
	.mixin(createCssTransitionMixin)
	.extend({
		tagName: 'card-details-nav-bar',
		classes: [ 'animated' ],
		childNodeRenderers: [
			function(this: CardNavBar): DNode[] {
				const { cards } = this.state;

				const cardNodes = cards.map((card) => {
					return d(createCard, { id: card.cardId, state: card });
				});

				return cardNodes;
			}
		]
	});

export default createCardNavBar;

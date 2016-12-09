import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { w } from 'dojo-widgets/d';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createCard, { CardState } from '../card/createCard';

export type CardNavBarState = WidgetState & {
	cards: CardState[];
}

export type CardNavBar = Widget<CardNavBarState>;

const createCardNavBar = createWidgetBase
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: {
			classes: [ 'animated', 'cardNavBar' ],
			getChildrenNodes: function(this: CardNavBar): DNode[] {
				const { cards = [] } = this.state;

				const cardNodes = cards.map((state) => {
					return w(createCard, { id: `card-details-nav-bar-${state.id}`, state });
				});

				return cardNodes;
			}
		}
	});

export default createCardNavBar;

import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
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
			childNodeRenderers: [
				function(this: CardNavBar): DNode[] {
					const { cards } = this.state;

					const cardNodes = cards.map((state) => {
						return d(createCard, { id: `card-details-nav-bar-${state.id}`, state });
					});

					return cardNodes;
				}
			]
		}
	});

export default createCardNavBar;

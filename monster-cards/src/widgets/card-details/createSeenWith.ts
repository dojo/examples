import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';
import createCard, { CardState } from '../card/createCard';
import { assign } from 'dojo-core/lang';

export type SeenWithState = WidgetState & {
	cards: CardState[];
}

export type SeenWith = Widget<SeenWithState>;

const createSeenWith = createWidgetBase.mixin({
	mixin: {
		classes: [ 'seenWith' ],
		getChildrenNodes: function(this: SeenWith): DNode[] {
			const { cards = [] } = this.state;

			const cardNodes = cards.map((card) => {
				const state = assign({ large: true }, card);
				return d(createCard, { id: `card-details-seen-with-${state.id}`, state });
			});

			return [
				d('h2', { innerHTML: 'last seen with'}),
				...cardNodes
			];
		}
	}
});

export default createSeenWith;

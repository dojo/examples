import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCard, { CardState } from '../card/createCard';
import { assign } from 'dojo-core/lang';
import * as css from './seen-with.module.styl';

export type SeenWithState = WidgetState & {
	cards: CardState[];
}

export type SeenWith = Widget<SeenWithState>;

const createSeenWith = createWidgetBase.mixin({
	mixin: {
		classes: [ css.seenWith ],
		childNodeRenderers: [
			function(this: SeenWith): DNode[] {
				const { cards } = this.state;

				const cardNodes = cards.map((card) => {
					const state = assign({ large: true }, card);
					return d(createCard, { id: `card-details-seen-with-${state.id}`, state });
				});

				return [
					d('h2', { innerHTML: 'last seen with'}),
					...cardNodes
				];
			}
		]
	}
});

export default createSeenWith;

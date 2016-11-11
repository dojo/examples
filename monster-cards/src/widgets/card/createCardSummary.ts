import { Widget, DNode } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import createCard from './createCard';

export type CardSummaryState = {
	name: string;
	imageClass: string;
	score: number;
	cardId: string;
}

export type CardSummary = Widget<CardSummaryState>

const createCardSummary = createWidgetBase.extend({
	tagName: 'div.cardSummary',
	childNodeRenderers: [
		function(this: CardSummary): DNode[] {
			const { cardId, imageClass, name, score } = this.state;
			return [
				d(createCard, { state: { cardId, imageClass, large: true } }),
				d('h2', { innerHTML: name }),
				d('p.points', { innerHTML: `milestone points: ${score}` })
			];
		}
	]
});

export default createCardSummary;

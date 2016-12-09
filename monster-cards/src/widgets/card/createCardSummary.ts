import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { v, w } from 'dojo-widgets/d';
import createCard from './createCard';

export type CardSummaryState = WidgetState & {
	name: string;
	imageClass: string;
	score: number;
	id: string;
}

export type CardSummary = Widget<CardSummaryState>

const createCardSummary = createWidgetBase.mixin({
	mixin: {
		classes: [ 'cardSummary' ],
		getChildrenNodes: function(this: CardSummary): DNode[] {
			const { id, imageClass, name, score } = this.state;

			const cardImage = w(createCard, { state: { id, imageClass, large: true } });
			const cardName = v('h2', { innerHTML: name });
			const cardPoints = v('p.points', { innerHTML: `milestone points: ${score}` });

			return [
				cardImage,
				cardName,
				cardPoints
			];
		}
	}
});

export default createCardSummary;

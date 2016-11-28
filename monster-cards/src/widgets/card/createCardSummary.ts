import { Widget, DNode, WidgetState } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
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

			const cardImage = d(createCard, { state: { id, imageClass, large: true } });
			const cardName = d('h2', { innerHTML: name });
			const cardPoints = d('p.points', { innerHTML: `milestone points: ${score}` });

			return [
				cardImage,
				cardName,
				cardPoints
			];
		}
	}
});

export default createCardSummary;

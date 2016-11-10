import { Widget } from 'dojo-interfaces/widgetBases';
import createWidgetBase from 'dojo-widgets/bases/createWidgetBase';
import d from 'dojo-widgets/util/d';
import { VNodeProperties } from 'maquette';

export type CardState = {
	imageClass: string;
	cardId: string;
	large?: boolean;
}

export type Card = Widget<CardState>;

const createCard = createWidgetBase.extend({
	classes: [ 'milestoneCard' ],
	tagName: 'a',
	nodeAttributes: [
		function (this: Card): VNodeProperties {
			return {
				href: `#/cards/${this.state.cardId}`
			};
		}
	],
	childNodeRenderers: [
		function(this: Card): any[] {
			const baseImageClass = this.state.large ? 'card-sprite-large' : 'card-sprite-small';
			return [
				d(`div.${baseImageClass}.${this.state.imageClass}`)
			];
		}
	]
});

export default createCard;

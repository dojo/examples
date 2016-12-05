import { Widget, DNode, WidgetState } from 'dojo-widgets/interfaces';
import createWidgetBase from 'dojo-widgets/createWidgetBase';
import d from 'dojo-widgets/d';
import { VNodeProperties } from 'maquette';

export type CardState = WidgetState & {
	imageClass: string;
	id: string;
	large?: boolean;
}

export type Card = Widget<CardState>;

const createCard = createWidgetBase.mixin({
	mixin: {
		tagName: 'a',
		classes: [ 'milestoneCard' ],
		nodeAttributes: [
			function (this: Card): VNodeProperties {
				return {
					href: `#/cards/${this.state.id}`
				};
			}
		],
		getChildrenNodes: function(this: Card): DNode[] {
			const baseImageClass = this.state.large ? 'card-sprite-large' : 'card-sprite-small';

			return [ d(`div.${baseImageClass}.${this.state.imageClass}`) ];
		}
	}
});

export default createCard;

import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createWidget from 'dojo-widgets/createWidget';
import createIconLink from '../common/createIconLink';
import { h, VNode } from 'maquette';
import Map from 'dojo-shim/Map';

import { favoriteCard } from './../../actions/userActions';

export type MilestoneCardDetails = {
	name: string;
	tagline: string;
	description: string;
	imageClass: string;
	favoriteCount: number;
	cardId: string;
}

export type CardDescriptionState = RenderMixinState & MilestoneCardDetails;

export type CardDescriptionOptions = RenderMixinOptions<CardDescriptionState>;

export type CardDescription = RenderMixin<CardDescriptionState>;

type ChildWidgetNames =
	'cardImage' |
	'name' |
	'tagline' |
	'description' |
	'favoriteCount' |
	'addTofavoritesLink' |
	'twitterLink' |
	'facebookLink';

const instanceWeakMap = new WeakMap<CardDescription, Map<ChildWidgetNames, RenderMixin<any>>>();

function manageChildren(this: CardDescription) {
	const childrenMap = instanceWeakMap.get(this);
	childrenMap.get('favoriteCount').setState({
		label: this.state.favoriteCount
	});
}

const createCardDescription = createRenderMixin
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: createRenderableChildrenMixin,
		initialize(instance: CardDescription, options: CardDescriptionOptions) {
			const childrenMap = new Map<ChildWidgetNames, RenderMixin<any>>();
			instanceWeakMap.set(instance, childrenMap);
			childrenMap.set('cardImage', createWidget({
				tagName: 'div',
				state: {
					classes: [ 'cardImage', 'card-sprite-large', options.state.imageClass ]
				}
			}));
			childrenMap.set('name', createWidget({
				state: {
					label: options.state.name
				},
				tagName: 'h1'
			}));
			childrenMap.set('tagline', createWidget({
				state: {
					label: options.state.tagline,
					classes: [ 'tagline' ]
				},
				tagName: 'strong'
			}));
			childrenMap.set('description', createWidget({
				state: {
					label: options.state.description
				},
				tagName: 'p'
			}));
			childrenMap.set('favoriteCount', createWidget({
				state: {
					label: options.state.favoriteCount.toString(),
					classes: [ 'favoriteCount' ]
				},
				tagName: 'span'
			}));
			childrenMap.set('addTofavoritesLink', createIconLink({
				listeners: {
					click: () => { favoriteCard.do(instance.state); }
				},
				state: {
					classes: [ 'button' ],
					iconClass: [ 'fa', 'fa-heart-o'],
					text: 'Add to favorites'
				}
			})),
			childrenMap.set('twitterLink', createIconLink({
				state: {
					classes: [ 'button' ],
					href: 'http://www.twitter.com',
					iconClass: [ 'fa', 'fa-twitter' ]
				}
			}));
			childrenMap.set('facebookLink', createIconLink({
				state: {
					classes: [ 'button' ],
					href: 'http://www.facebook.com',
					iconClass: [ 'fa', 'fa-facebook' ]
				}
			}));

			instance.on('statechange', manageChildren);
		}
	})
	.extend({
		tagName: 'card-details-description',
		getChildrenNodes(this: CardDescription): VNode[] {
			const childrenMap = instanceWeakMap.get(this);
			return [
				childrenMap.get('cardImage').render(),
				h('article', [
					childrenMap.get('name').render(),
					childrenMap.get('tagline').render(),
					childrenMap.get('description').render(),
					h('span', 'favorited: '),
					childrenMap.get('favoriteCount').render(),
					h('div.buttonHolder', [
						childrenMap.get('addTofavoritesLink').render(),
						childrenMap.get('twitterLink').render(),
						childrenMap.get('facebookLink').render()
					])
				])
			];
		}
	});

export default createCardDescription;

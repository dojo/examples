import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createWidget from 'dojo-widgets/createWidget';
import createIconLink from '../common/createIconLink';
import { h, VNode } from 'maquette';
import Map from 'dojo-shim/Map';

export type MilestoneCardDetails = {
	name: string;
	tagline: string;
	description: string;
	imageClass: string;
	favouriteCount: number;
	cardId: string;
}

export type CardDescriptionState = RenderMixinState & MilestoneCardDetails;

type CardDescriptionOptions = RenderMixinOptions<CardDescriptionState>;

type CardDescription = RenderMixin<CardDescriptionState>;

export type CardDescriptionItem = RenderMixin<CardDescriptionState>;

const favouriteHref = '/api/favourite/';

type ChildWidgetNames =
	'cardImage' |
	'name' |
	'tagline' |
	'description' |
	'favouriteCount' |
	'addToFavouritesLink' |
	'twitterLink' |
	'facebookLink';

type ChildrenMap = Map<ChildWidgetNames, RenderMixin<any>>;

const instanceWeakMap = new WeakMap<CardDescription, ChildrenMap>();

function manageChildren(this: CardDescriptionItem) {
	const childrenMap = instanceWeakMap.get(this);
	childrenMap.get('favouriteCount').setState({
		label: this.state.favouriteCount
	});
}

const createCardDescription = createRenderMixin
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: createRenderableChildrenMixin,
		initialize(instance: CardDescription, options: CardDescriptionOptions) {
			const childrenMap = new Map();
			instanceWeakMap.set(instance, <ChildrenMap> childrenMap);
			childrenMap.set('cardImage', createWidget({
				tagName: 'div',
				state: {
					classes: [ 'cardImage', 'cardImageLarge', options.state.imageClass ]
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
			childrenMap.set('favouriteCount', createWidget({
				state: {
					label: options.state.favouriteCount.toString(),
					classes: [ 'favouriteCount' ]
				},
				tagName: 'span'
			}));
			childrenMap.set('addToFavouritesLink', createIconLink({
				state: {
					classes: [ 'button' ],
					href: favouriteHref + options.state.id,
					iconClass: [ 'fa', 'fa-heart-o'],
					text: 'Add to favourites'
				}
			}));
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
			instance.invalidate();
		}
	})
	.extend({
		tagName: 'card-details-description',
		getChildrenNodes(this: CardDescriptionItem): VNode[] {
			const childrenMap = instanceWeakMap.get(this);
			return [
				childrenMap.get('cardImage').render(),
				h('article', [
					childrenMap.get('name').render(),
					childrenMap.get('tagline').render(),
					childrenMap.get('description').render(),
					h('span', 'Favourited: '),
					childrenMap.get('favouriteCount').render(),
					h('div.buttonHolder', [
						childrenMap.get('addToFavouritesLink').render(),
						childrenMap.get('twitterLink').render(),
						childrenMap.get('facebookLink').render()
					])
				])
			];
		}
	});

export default createCardDescription;

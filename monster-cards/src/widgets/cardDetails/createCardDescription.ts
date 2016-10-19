import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinState, RenderMixinOptions } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren, CreateChildrenResults, CreateChildrenResultsItem } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createCssTransitionMixin from 'dojo-widgets/mixins/createCssTransitionMixin';
import createWidget from 'dojo-widgets/createWidget';
import createImage from '../common/createImage';
import createIconLink from '../common/createIconLink';
import { Child } from 'dojo-widgets/mixins/interfaces';
import { h, VNode } from 'maquette';
import WeakMap from 'dojo-shim/WeakMap';

export type MilestoneCardDetails = {
	name: string;
	tagline: string;
	description: string;
	cardImage: string;
	favouriteCount: number;
	id: string;
}

export type CardDescriptionState = RenderMixinState & StatefulChildrenState & {
	name?: string;
	tagline?: string;
	description?: string;
	cardImage?: string;
	favouriteCount?: number;
	id?: string;
};

type CardDescriptionOptions = RenderMixinOptions<CardDescriptionState>;

type CardDescription = RenderMixin<CardDescriptionState> & StatefulChildren<Child>;

export type CardDescriptionItem = RenderMixin<CardDescriptionState>;

interface CardDescriptionChildren<C extends Child> extends CreateChildrenResults<C> {
	name: CreateChildrenResultsItem<C>;
	tagline: CreateChildrenResultsItem<C>;
	description: CreateChildrenResultsItem<C>;
	cardImage: CreateChildrenResultsItem<C>;
	favouriteCount: CreateChildrenResultsItem<C>;
}

const childrenMap = new WeakMap<CardDescriptionItem, CardDescriptionChildren<RenderMixin<any>>>();

const favouriteHref = '/api/favourite/';

function manageChildren(this: CardDescriptionItem) {
	const { favouriteCount } = childrenMap.get(this);

	favouriteCount.widget.setState({
		label: this.state.favouriteCount
	});
}

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin(createCssTransitionMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: CardDescription, options: CardDescriptionOptions) {
			instance
				.createChildren({
					cardImage: {
						factory: createImage,
						options: {
							state: {
								src: options.state.cardImage,
								classes: [ 'cardImage' ]
							}
						}
					},
					name: {
						factory: createWidget,
						options: {
							state: {
								label: options.state.name
							},
							tagName: 'h1'
						}
					},
					tagline: {
						factory: createWidget,
						options: {
							tagName: 'strong',
							state: {
								label: options.state.tagline,
								classes: [ 'tagline' ]
							}
						}
					},
					description: {
						factory: createWidget,
						options: {
							state: {
								label: options.state.description
							},
							tagName: 'p'
						}
					},
					favouriteCount: {
						factory: createWidget,
						options: {
							tagName: 'span',
							state: {
								label: options.state.favouriteCount,
								classes: [ 'favouriteCount' ]
							}
						}
					},
					addToFavouritesLink: {
						factory: createIconLink,
						options: {
							state: {
								href: favouriteHref + options.state.id,
								iconClass: [ 'fa', 'fa-heart-o'],
								text: 'Add to favourites'
							}
						}
					},
					twitterLink: {
						factory: createIconLink,
						options: {
							state: {
								href: 'http://www.twitter.com',
								iconClass: [ 'fa', 'fa-twitter-o' ]
							}
						}
					},
					facebookLink: {
						factory: createIconLink,
						options: {
							state: {
								href: 'http://www.facebook.com',
								iconClass: [ 'fa', 'fa-facebook' ]
							}
						}
					}
				})
				.then((children: CardDescriptionChildren<RenderMixin<Child>>) => {
					childrenMap.set(instance, children);
					instance.on('statechange', manageChildren);
				});
		}
	})
	.extend({
		tagName: 'card-details-description',
		getChildrenNodes(this: CardDescriptionItem): VNode[] {
			const { cardImage,
					name,
					tagline,
					description,
					favouriteCount,
					twitterLink,
					facebookLink,
					addToFavouritesLink
				} = childrenMap.get(this);

			return [
				cardImage.widget.render(),
				h('article', [
					name.widget.render(),
					tagline.widget.render(),
					description.widget.render(),
					h('span', 'Favourited: '),
					favouriteCount.widget.render(),
					h('div.buttonHolder', [
						addToFavouritesLink.widget.render(),
						twitterLink.widget.render(),
						facebookLink.widget.render()
					])
				])
			];
		}
	});

export default create;

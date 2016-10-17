import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren, CreateChildrenResults, CreateChildrenResultsItem } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createWidget from 'dojo-widgets/createWidget';
import createImage from '../common/createImage';
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
	details?: MilestoneCardDetails,
};

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
	const { cardImage, name, tagline, description, favouriteCount } = childrenMap.get(this);

	cardImage.widget.setState({
		src: this.state.details.cardImage
	});

	name.widget.setState({
		label: this.state.details.name
	});

	tagline.widget.setState({
		label: this.state.details.tagline
	});

	description.widget.setState({
		label: this.state.details.description
	});

	favouriteCount.widget.setState({
		label: this.state.details.favouriteCount
	});
}

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: CardDescription) {
			instance
				.createChildren({
					cardImage: {
						factory: createImage,
						options: {
							state: {
								classes: [ 'cardImage' ]
							}
						}
					},
					name: {
						factory: createWidget,
						options: { tagName: 'h1' }
					},
					tagline: {
						factory: createWidget,
						options: {
							tagName: 'strong',
							state: {
								classes: [ 'tagline' ]
							}
						}
					},
					description: {
						factory: createWidget,
						options: { tagName: 'p' }
					},
					favouriteCount: {
						factory: createWidget,
						options: {
							tagName: 'span',
							state: {
								classes: [ 'favouriteCount' ]
							}
						}
					}
				})
				.then((children: CardDescriptionChildren<RenderMixin<any>>) => {
					childrenMap.set(instance, children);
					instance.on('statechange', manageChildren);

					// This only works now that I have overridden `getChildrenNodes`
					instance.setState({});
				});
		}
	})
	.extend({
		tagName: 'card-details-description',
		getChildrenNodes(this: CardDescriptionItem): VNode[] {
			const { cardImage, name, tagline, description, favouriteCount } = childrenMap.get(this);
			return [
				cardImage.widget.render(),
				h('article', [
					name.widget.render(),
					tagline.widget.render(),
					description.widget.render(),
					h('span', 'Favourited: '),
					favouriteCount.widget.render(),
					h('div.buttonHolder', [
						h('a.button.addToFavourites', {
							href: favouriteHref + this.state.details.id
						}, [
							h('i.fa.fa-heart-o'),
							'add to favourites'
						]),
						h('a.button.twitter', { href: '#blank', target: 'blank' }, [
							h('i.fa.fa-twitter')
						]),
						h('a.button.facebook', { href: '#blank', target: 'blank' }, [
							h('i.fa.fa-facebook')
						])
					])
				])
			];
		}
	});

export default create;

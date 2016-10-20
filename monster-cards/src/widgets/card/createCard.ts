import createRenderMixin, { RenderMixin, RenderMixinOptions, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createImage from '../common/createImage';
import { Child } from 'dojo-widgets/mixins/interfaces';
import compose, { ComposeFactory } from 'dojo-compose/compose';
import { historyManager } from './../../routes';

export type CardState = RenderMixinState & StatefulChildrenState & {
	name: string;
	tagline: string;
	description: string;
	cardImage: string;
	favouriteCount: number;
	id: string;
}

type CardOptions = RenderMixinOptions<CardState>;

export type Card = RenderMixin<CardState> & StatefulChildren<Child>;

type CardFactory = ComposeFactory<Card, CardOptions>;
const create = compose({
	},
	(instance: any, options: any) => {
		options.listeners = {
			click: (event: any): void => {
				historyManager.set(`/cards/${instance.state.id}`);
			}
		};
	})
	.mixin(createRenderMixin)
	.mixin(createVNodeEvented)
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: Card, options: CardOptions) {
			instance
				.createChildren({
					image: {
						factory: createImage.mixin(createVNodeEvented),
						options: {
							listeners: {
								click: (event: any): void => {
									historyManager.set(`/cards/${instance.state.id}`);
								}
							},
							state: {
								src: options.state.cardImage
							}
						}
					}
				})
				.then(() => {
					instance.invalidate();
				});
		}
	})
	.extend({
		classes: [ 'milestoneCard' ],
		tagName: 'a'
	});

export default create;

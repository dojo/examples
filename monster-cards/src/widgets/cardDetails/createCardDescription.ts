import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createRenderMixin, { RenderMixin, RenderMixinState } from 'dojo-widgets/mixins/createRenderMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildren, CreateChildrenResults, CreateChildrenResultsItem } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import createWidget from 'dojo-widgets/createWidget';
import { Child } from 'dojo-widgets/mixins/interfaces';

export type MilestoneCardDetails = {
	name: string;
	tagline: string;
	description: string;
}

export type CardDescriptionState = RenderMixinState & StatefulChildrenState & {
	details?: MilestoneCardDetails,
};

// export type CardDescriptionItem = RenderMixin<CardDescriptionState>;

type CardDescription = RenderMixin<CardDescriptionState> & StatefulChildren<Child>;

interface CardDescriptionChildren<C extends Child> extends CreateChildrenResults<C> {
	name: CreateChildrenResultsItem<C>;
	tagline: CreateChildrenResultsItem<C>;
	description: CreateChildrenResultsItem<C>;
}

// type CardDescriptionFactory = ComposeFactory<CardDescription, CardDescriptionOptions>;

const create = createRenderMixin
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance: CardDescription) {
			instance
				.createChildren({
					name: {
						factory: createWidget,
						options: {
							tagName: 'h2',
							state: {
								classes: [ 'myClass' ]
							}
						}
					},
					tagline: {
						factory: createWidget,
						options: {
							tagName: 'strong',
							state: {
								classes: [ 'myClass' ]
							}
						}
					},
					description: {
						factory: createWidget,
						options: {
							tagName: 'p',
							state: {
								classes: [ 'myClass' ]
							}
						}
					}
				})
				.then((children: CardDescriptionChildren<RenderMixin<any>>) => {
					instance.on('statechange', (event) => {
						// const { name, tagline, description } = children;
						console.log('here');

						// children.name.widget.setState({
						// 	label: 'badger'
						// });
						// console.log(JSON.stringify(event));
						// console.dir(children);
						// children.name.widget.setState({
						// 	label: instance.state.details.name
						// });
					});
					instance.setState({});
					// instance.invalidate();
				});
		}
	})
	.extend({
		tagName: 'card-details-description',
		is: 'article'
	});

export default create;

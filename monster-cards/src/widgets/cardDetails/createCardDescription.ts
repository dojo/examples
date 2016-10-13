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

type CardDescription = RenderMixin<CardDescriptionState> & StatefulChildren<Child>;

interface CardDescriptionChildren<C extends Child> extends CreateChildrenResults<C> {
	name: CreateChildrenResultsItem<C>;
	tagline: CreateChildrenResultsItem<C>;
	description: CreateChildrenResultsItem<C>;
}

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
					function manageChildren() {
						const { name, tagline, description } = children;

						name.widget.setState({
							label: instance.state.details.name
						});

						tagline.widget.setState({
							label: instance.state.details.tagline
						});

						description.widget.setState({
							label: instance.state.details.description
						});
					}

					instance.on('statechange', manageChildren);
					manageChildren();
				});
		}
	})
	.extend({
		tagName: 'card-details-description',
		is: 'article'
	});

export default create;

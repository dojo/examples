import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';
import createTextInput from 'dojo-widgets/createTextInput';
import createRenderableChildrenMixin from 'dojo-widgets/mixins/createRenderableChildrenMixin';
import createStatefulChildrenMixin, { StatefulChildrenState, StatefulChildrenOptions } from 'dojo-widgets/mixins/createStatefulChildrenMixin';
import { Child } from 'dojo-widgets/mixins/interfaces';

import createIcon from './createIcon';

interface SearchInputState extends WidgetState, StatefulChildrenState { }

export interface SearchInputOptions extends WidgetOptions<SearchInputState>, StatefulChildrenOptions<Child, SearchInputState> { }

export type SearchInput = Widget<SearchInputState>;

export interface SearchInputFactory extends ComposeFactory<SearchInput, SearchInputOptions> { }

const createSearchInput: SearchInputFactory = createWidget
	.mixin(createRenderableChildrenMixin)
	.mixin({
		mixin: createStatefulChildrenMixin,
		initialize(instance, options) {
			instance.createChildren({
				searchInput: {
					factory: createTextInput,
					options: {
						type: 'search'
					}
				},
				searchIcon: {
					factory: createIcon,
					options: {
						state: {
							classes: [ 'fa', 'fa-search' ]
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
		tagName: 'li'
	});

export default createSearchInput;

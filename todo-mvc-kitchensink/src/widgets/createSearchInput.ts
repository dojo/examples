import { VNodeProperties } from '@dojo/interfaces/vdom';
import createWidget from '@dojo/widgets/createWidgetBase';
import { WidgetProperties, Widget } from '@dojo/widgets/interfaces';
import createFormFieldMixin from '@dojo/widgets/mixins/createFormFieldMixin';

export interface SearchInputProperties extends WidgetProperties {
	onKeyUp?: (event?: KeyboardEvent) => void;
}

export type SearchInput = Widget<SearchInputProperties> & {
	onKeyUp?: (event?: KeyboardEvent) => void;
}

const createSearchInput = createWidget
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			classes: [ 'search' ],
			tagName: 'input',
			type: 'text',
			onKeyUp(this: SearchInput, event?: KeyboardEvent) {
				this.properties.onKeyUp && this.properties.onKeyUp(event);
			},
			nodeAttributes: [
				function (this: SearchInput): VNodeProperties {
					const { onKeyUp: onkeyup } = this;
					const { placeholder = '' } = this.properties;

					return {
						placeholder,
						onkeyup
					};
				}
			]
		}
	});

export default createSearchInput;

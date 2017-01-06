import { VNodeProperties } from 'dojo-interfaces/vdom';
import createFormFieldMixin from 'dojo-widgets/mixins/createFormFieldMixin';
import createWidget from 'dojo-widgets/createWidgetBase';

const createSearchInput = createWidget
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			classes: [ 'search' ],
			tagName: 'input',
			type: 'text',
			nodeAttributes: [
				function (this: any): VNodeProperties {
					const { placeholder = '' } = this.state;

					return {
						placeholder
					};
				}
			]
		}
	});

export default createSearchInput;

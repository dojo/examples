import WeakMap from '@dojo/shim/WeakMap';
import createFormFieldMixin, { FormFieldMixin } from '@dojo/widgets/mixins/createFormFieldMixin';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { Widget } from '@dojo/widgets/interfaces';
import { VNodeProperties } from '@dojo/interfaces/vdom';

interface FocusableTextInputProperties {
	focused?: boolean;
	placeholder?: string;
}

export type FocusableTextInput = Widget<FocusableTextInputProperties> & FormFieldMixin<string, FocusableTextInputProperties>;

const afterUpdateFunctions = new WeakMap<FocusableTextInput, { (element: HTMLInputElement): void }>();

function afterUpdate(instance: FocusableTextInput, element: HTMLInputElement) {
	const focused = instance.state.focused;
	if (focused) {
		setTimeout(() => element.focus(), 0);
	}
	else if (!focused && document.activeElement === element) {
		element.blur();
	}
}

const createFocusableTextInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'text',
			nodeAttributes: [
				function (this: FocusableTextInput): VNodeProperties {
					const afterUpdate = afterUpdateFunctions.get(this);
					const { placeholder, value } = this.state;
					return {
						afterUpdate,
						placeholder,
						value,
						afterCreate: afterUpdate
					};
				}
			]
		},
		initialize(instance) {
			afterUpdateFunctions.set(instance, (element: HTMLInputElement) => afterUpdate(instance, element));
		}
	});

export default createFocusableTextInput;

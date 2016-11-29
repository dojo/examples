import createWidgetBase from 'dojo-widgets/createWidgetBase';
import { Widget, WidgetOptions, WidgetState } from 'dojo-interfaces/widgetBases';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinOptions, FormFieldMixinState } from 'dojo-widgets/mixins/createFormFieldMixin';
import createVNodeEvented from 'dojo-widgets/mixins/createVNodeEvented';
import { VNodeProperties } from 'dojo-interfaces/vdom';
import { EventTargettedObject } from 'dojo-interfaces/core';

export type CheckboxInputState = WidgetState & FormFieldMixinState<string> & {
	checked?: boolean;
};

export type CheckboxInputOptions = WidgetOptions<CheckboxInputState> & FormFieldMixinOptions<string, CheckboxInputState>;

export type CheckboxInput = Widget<CheckboxInputState> & FormFieldMixin<string, CheckboxInputState>;

const createCheckboxInput = createWidgetBase
	.mixin(createFormFieldMixin)
	.mixin({
		mixin: createVNodeEvented,
		initialize(instance) {
			instance.own(instance.on('input', (event: EventTargettedObject<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
		}
	})
	.mixin({
		mixin: {
			tagName: 'input',
			type: 'checkbox',
			nodeAttributes: [
				function (this: CheckboxInput): VNodeProperties {
					const { checked } = this.state;
					return checked !== undefined ? { checked } : {};
				}
			]
		}
	});

export default createCheckboxInput;

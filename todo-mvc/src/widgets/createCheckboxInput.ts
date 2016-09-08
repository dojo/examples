import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'maquette';

/* I suspect this needs to go somewhere else */
export interface TypedTargetEvent<T extends EventTarget> extends Event {
	target: T;
}

export interface CheckboxInputOptions extends WidgetOptions<FormFieldMixinState<string>>, FormFieldMixinOptions<string, FormFieldMixinState<string>> { }

export type CheckboxInput = Widget<FormFieldMixinState<string>> & FormFieldMixin<string, FormFieldMixinState<string>>;

export interface CheckboxInputFactory extends ComposeFactory<CheckboxInput, CheckboxInputOptions> { }

const createCheckboxInput: CheckboxInputFactory = createWidget
	.mixin({
		mixin: createFormFieldMixin,
		aspectAdvice: {
			before: {
				getNodeAttributes(overrides: VNodeProperties = {}) {
					const formfield: FormFieldMixin<any, FormFieldMixinState<any>> & {
						state: any;
					} = this;

					if (formfield.state.checked !== undefined) {
						overrides.checked = formfield.state.checked;
					}

					return [overrides];
				}
			}
		},
		initialize(instance) {
			instance.own(instance.on('input', (event: TypedTargetEvent<HTMLInputElement>) => {
				instance.value = event.target.value;
			}));
		}
	})
	.extend({
		type: 'checkbox',
		tagName: 'input'
	});

export default createCheckboxInput;

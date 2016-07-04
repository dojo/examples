import { ComposeFactory } from 'dojo-compose/compose';
import { assign } from 'dojo-core/lang';
import createWidget, { Widget, WidgetOptions } from 'dojo-widgets/createWidget';
import createFormFieldMixin, { FormFieldMixin, FormFieldMixinState, FormFieldMixinOptions } from 'dojo-widgets/mixins/createFormFieldMixin';
import { VNodeProperties } from 'maquette/maquette';

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
				getNodeAttributes(...args: any[]) {
					const formfield: FormFieldMixin<any, FormFieldMixinState<any>> & {
						state: any;
					} = this;
					const overrides: VNodeProperties = {};

					if (formfield.state.checked !== undefined) {
						overrides.checked = formfield.state.checked;
					}

					// this is a hack, it should go into the formfield mixin
					if (formfield.state.placeholder !== undefined) {
						overrides.placeholder = formfield.state.placeholder;
					}

					if (!args[0]) {
						args[0] = {};
					}
					assign(args[0], overrides);

					return args;
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

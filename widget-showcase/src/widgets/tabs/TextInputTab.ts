import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import TimePicker, { TimeUnits } from '@dojo/widgets/time-picker';
import TextInput, { TextInputProperties } from '@dojo/widgets/text-input';
import EnhancedTextInput from '@dojo/widgets/enhanced-text-input';
import * as css from '../../styles/tabs.m.css';
import { Constructor } from '@dojo/framework/widget-core/interfaces';

export default class TextInputTab extends WidgetBase {
	private _state: any = {};

	private createInput<W extends WidgetBase>(
		Widget: Constructor<W>,
		props: W['properties'] & { key: string },
		options: { cbName: string, initialValue: string } = { cbName: 'onInput', initialValue: '' }
	) {
		const { cbName = 'onInput', initialValue = '' } = options;
		if (!this._state[props.key]) {
			this._state[props.key] = initialValue;
		}
		return w(Widget, {
			...(props as any),
			value: this._state[props.key],
			[cbName]: (value: string) => {
				this._state[props.key] = value;
				this.invalidate();
			}
		});
	}

	render() {;
		return v('div', { classes: css.root }, [
			v('h2', [ 'Text input' ]),
			v('div', [
				this.createInput(TextInput, {
					label: 'Plain text input',
					type: 'text',
					placeholder: 'Hello',
					key: 'plain'
				}),
				this.createInput(TextInput, {
					label: 'required text input',
					type: 'text',
					required: true,
					placeholder: 'World',
					key: 'required'
				}),
				this.createInput(TextInput, {
					label: 'email input',
					type: 'email',
					placeholder: 'Email address',
					key: 'email'
				}),
				this.createInput(TextInput, {
					type: 'text',
					label: 'Disabled input',
					value: 'Initial value',
					disabled: true,
					readOnly: true,
					key: 'disabled'
				})
			]),
			v('h2', [ 'Enhanced Text input' ]),
			v('div', [
				this.createInput(EnhancedTextInput, {
					addonBefore: [ '@' ],
					label: 'Twitter Username',
					type: 'text',
					placeholder: 'username',
					key: 'twitter'
				}),
				this.createInput(EnhancedTextInput, {
					addonBefore: [ '$' ],
					addonAfter: [ '.00' ],
					label: 'Price, rounded to the nearest dollar',
					type: 'number',
					key: 'number'
				})
			]),
			v('h2', [ 'Time picker' ]),
			v('div', [
				this.createInput(TimePicker, {
					clearable: true,
					end: '23:59',
					label: 'Basic time picker',
					start: '00:00',
					step: 1800,
					key: 'basic-picker'
				}, { cbName: 'onChange', initialValue: '01:30' }),
				this.createInput(TimePicker, {
					clearable: true,
					end: '23:59',
					label: 'Basic time picker (native)',
					start: '00:00',
					step: 1800,
					useNativeElement: true,
					key: 'basic-native-picker'
				}, { cbName: 'onChange', initialValue: '08:30' }),
				this.createInput(TimePicker, {
					clearable: true,
					disabled: true,
					end: '23:59',
					label: 'Disabled time picker',
					start: '00:00',
					step: 1800,
					key: 'disabled-picker'
				}, { cbName: 'onChange', initialValue: '10:30' }),
				this.createInput(TimePicker, {
					clearable: true,
					disabled: true,
					end: '23:59',
					label: 'Disabled time picker (native)',
					start: '00:00',
					step: 1800,
					useNativeElement: true,
					key: 'disabled-native-picker'
				}, { cbName: 'onChange', initialValue: '11:30' })
			])
		]);
	}
}

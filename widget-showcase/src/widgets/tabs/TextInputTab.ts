import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import TimePicker, { TimeUnits } from '@dojo/widgets/timepicker/TimePicker';
import TextInput from '@dojo/widgets/textinput/TextInput';
import EnhancedTextInput from '@dojo/widgets/enhancedtextinput/EnhancedTextInput';

export default class BasicFormTab extends WidgetBase {
	private _timePickerOptions: TimeUnits[];
	private _timePickerValue = '10:30';

	private _onRequestOptions(value: string, options: TimeUnits[]) {
		this._timePickerOptions = options;
		this.invalidate();
	}

	private _onSetValue(value: string) {
		this._timePickerValue = value;
		this.invalidate();
	}

	render() {
		return [
			v('h2', [ 'Text input' ]),
			v('div', [
				w(TextInput, {
					label: 'Plain text input',
					type: 'text',
					placeholder: 'Hello'
				}),
				w(TextInput, {
					label: 'required text input',
					type: 'text',
					required: true,
					placeholder: 'World'
				}),
				w(TextInput, {
					label: 'email input',
					type: 'email',
					placeholder: 'Email address'
				}),
				w(TextInput, {
					type: 'text',
					label: 'Disabled input',
					value: 'Initial value',
					disabled: true,
					readOnly: true
				})
			]),
			v('h2', [ 'Enhanced Text input' ]),
			v('div', [
				w(EnhancedTextInput, {
					addonBefore: [ '@' ],
					label: 'Twitter Username',
					type: 'text',
					placeholder: 'username'
				}),
				w(EnhancedTextInput, {
					addonBefore: [ '$' ],
					addonAfter: [ '.00' ],
					label: 'Price, rounded to the nearest dollar',
					type: 'number'
				})
			]),
			v('h2', [ 'Time picker' ]),
			v('div', [
				w(TimePicker, {
					clearable: true,
					end: '03:30',
					onRequestOptions: this._onRequestOptions,
					label: 'Basic time picker',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue
				}),
				w(TimePicker, {
					clearable: true,
					end: '03:30',
					onRequestOptions: this._onRequestOptions,
					label: 'Basic time picker (native)',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue,
					useNativeElement: true
				}),
				w(TimePicker, {
					clearable: true,
					disabled: true,
					end: '03:30',
					onRequestOptions: this._onRequestOptions,
					label: 'Disabled time picker',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue
				}),
				w(TimePicker, {
					clearable: true,
					disabled: true,
					end: '03:30',
					onRequestOptions: this._onRequestOptions,
					label: 'Disabled time picker (native)',
					onChange: this._onSetValue,
					options: this._timePickerOptions,
					start: '00:00',
					step: 1800,
					value: this._timePickerValue,
					useNativeElement: true
				})
			])
		];
	}
}

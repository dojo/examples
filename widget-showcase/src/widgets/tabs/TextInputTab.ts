import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import TimePicker from '@dojo/widgets/time-picker';
import TextInput from '@dojo/widgets/text-input';
import * as css from '../../styles/tabs.m.css';

const factory = create({ icache });

export default factory(function TextInputTab({ middleware: { icache } }) {
	const state = icache.get<{ [index: string]: string }>('state') || {};

	return v('div', { classes: css.root }, [
		v('h2', ['Text input']),
		v('div', [
			w(TextInput, {
				key: 'plain',
				label: 'Plain text input',
				value: state['plain'] || '',
				onInput: (value: string) => {
					icache.set('state', { ...state, plain: value });
				}
			}),
			w(TextInput, {
				key: 'required',
				label: 'Required text input',
				required: true,
				value: state['required'] || '',
				onInput: (value: string) => {
					icache.set('state', { ...state, required: value });
				}
			}),
			w(TextInput, {
				key: 'email',
				type: 'email',
				placeholder: 'Email address',
				label: 'Email input',
				required: true,
				value: state['email'] || '',
				onInput: (value: string) => {
					icache.set('state', { ...state, email: value });
				}
			}),
			w(TextInput, {
				key: 'disabled',
				label: 'Disabled input',
				disabled: true,
				readOnly: true,
				value: state['disabled'] || 'Initial value',
				onInput: (value: string) => {
					icache.set('state', { ...state, disabled: value });
				}
			})
		]),
		v('h2', ['Time picker']),
		v('div', [
			w(TimePicker, {
				clearable: true,
				end: '23:59',
				label: 'Basic time picker',
				start: '00:00',
				step: 1800,
				key: 'basic-picker',
				value: state['basic'] || '01:30',
				onChange: (value: string) => {
					icache.set('state', { ...state, basic: value });
				}
			}),
			w(TimePicker, {
				clearable: true,
				end: '23:59',
				label: 'Basic time picker (native)',
				start: '00:00',
				step: 1800,
				useNativeElement: true,
				key: 'basic-native-picker',
				value: state['basicNative'] || '08:30',
				onChange: (value: string) => {
					icache.set('state', { ...state, basicNative: value });
				}
			}),
			w(TimePicker, {
				clearable: true,
				disabled: true,
				end: '23:59',
				label: 'Disabled time picker',
				start: '00:00',
				step: 1800,
				key: 'disabled-picker',
				value: state['disabled'] || '10:30',
				onChange: (value: string) => {
					icache.set('state', { ...state, disabled: value });
				}
			}),
			w(TimePicker, {
				clearable: true,
				disabled: true,
				end: '23:59',
				label: 'Disabled time picker (native)',
				start: '00:00',
				step: 1800,
				useNativeElement: true,
				key: 'disabled-native-picker',
				value: state['disabledNative'] || '11:30',
				onChange: (value: string) => {
					icache.set('state', { ...state, disabledNative: value });
				}
			})
		])
	]);
});

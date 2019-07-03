import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Select from '@dojo/widgets/select';
import * as css from '../../styles/tabs.m.css';

const animals = [
	{
		value: 'cat',
		label: 'Cat'
	},
	{
		value: 'dog',
		label: 'Dog'
	},
	{
		value: 'hamster',
		label: 'Hamster'
	},
	{
		value: 'goat',
		label: 'Goat',
		disabled: true
	}
];

const factory = create({ icache });

export default factory(function SelectTab({ middleware: { icache } }) {
	const state = icache.get<{ [index: string]: string }>('state') || {};

	return v('div', { classes: css.root }, [
		v('h2', ['Select Widgets']),
		v('div', [
			w(Select, {
				label: 'Simple string array',
				options: ['foo', 'bar', 'baz', 'qux'],
				key: 'simple',
				value: state['simple'],
				onChange: (value: any) => {
					icache.set('state', { ...state, simple: value });
				}
			}),
			w(Select, {
				label: 'Simple string array (disabled)',
				options: ['foo', 'bar', 'baz', 'qux'],
				disabled: true,
				key: 'simple-disabled',
				value: state['simple-disabled'],
				onChange: (value: any) => {
					icache.set('state', { ...state, 'simple-disabled': value });
				}
			}),
			w(Select, {
				label: 'Simple string array (native)',
				options: ['foo', 'bar', 'baz', 'qux'],
				useNativeElement: true,
				key: 'simple-native',
				value: state['simple-native'],
				onChange: (value: any) => {
					icache.set('state', { ...state, 'simple-native': value });
				}
			}),
			w(Select, {
				label: 'Simple string array (native, disabled)',
				options: ['foo', 'bar', 'baz', 'qux'],
				useNativeElement: true,
				disabled: true,
				key: 'simple-native-disabled',
				value: state['simple-native'],
				onChange: (value: any) => {
					icache.set('state', { ...state, 'simple-native': value });
				}
			}),
			w(Select, {
				label: 'Complex options array',
				options: animals,
				getOptionDisabled: (option: any) => option.disabled,
				getOptionLabel: (option: any) => option.label,
				getOptionValue: (option: any) => option.value,
				key: 'complex',
				value: state['complex'],
				onChange: (option: any) => {
					icache.set('state', { ...state, complex: option.value });
				}
			}),
			w(Select, {
				label: 'Complex options array (native)',
				options: animals,
				getOptionDisabled: (option: any) => option.disabled,
				getOptionLabel: (option: any) => option.label,
				getOptionValue: (option: any) => option.value,
				useNativeElement: true,
				key: 'complex-native',
				value: state['complex-native'],
				onChange: (option: any) => {
					icache.set('state', { ...state, 'complex-native': option.value });
				}
			})
		])
	]);
});

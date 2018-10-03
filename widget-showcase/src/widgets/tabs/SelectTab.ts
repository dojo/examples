import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Select from '@dojo/widgets/select';
import * as css from '../../styles/tabs.m.css';
import { Constructor } from '@dojo/framework/widget-core/interfaces';

export default class SelectTab extends WidgetBase {

	private _state: any = {};

	private w<W extends WidgetBase>(
		Widget: Constructor<W>,
		props: W['properties'] & { key: string },
		options: { cbName?: string, initialValue?: string, mapper?: (value: any) => string } = { cbName: 'onInput', initialValue: '' }
	) {
		const { cbName = 'onInput', initialValue = '', mapper } = options;
		if (!this._state[props.key]) {
			this._state[props.key] = initialValue;
		}
		return w(Widget, {
			...(props as any),
			value: this._state[props.key],
			[cbName]: (value: string) => {
				this._state[props.key] = mapper ? mapper(value) : value;
				this.invalidate();
			}
		});
	}


	private _animals = [
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

	render() {
		return v('div', { classes: css.root }, [
			v('h2', [ 'Select Widgets' ]),
			v('div', [
				this.w(Select, {
					label: 'Simple string array',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					key: 'simple'
				}, { cbName: 'onChange'}),
				this.w(Select, {
					label: 'Simple string array (disabled)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					disabled: true,
					key: 'simple-disabled'
				}, { cbName: 'onChange'}),
				this.w(Select, {
					label: 'Simple string array (native)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					useNativeElement: true,
					key: 'simple-native'
				}, { cbName: 'onChange'}),
				this.w(Select, {
					label: 'Simple string array (native, disabled)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					useNativeElement: true,
					disabled: true,
					key: 'simple-native-disabled'
				}, { cbName: 'onChange'}),
				this.w(Select, {
					label: 'Complex options array',
					options: this._animals,
					getOptionDisabled: (option: any) => option.disabled,
					getOptionLabel: (option: any) => option.label,
					getOptionValue: (option: any) => option.value,
					key: 'complex'
				}, { cbName: 'onChange', mapper: (option: any) => option.value}),
				this.w(Select, {
					label: 'Complex options array (native)',
					options: this._animals,
					getOptionDisabled: (option: any) => option.disabled,
					getOptionLabel: (option: any) => option.label,
					getOptionValue: (option: any) => option.value,
					useNativeElement: true,
					key: 'complex-native'
				}, { cbName: 'onChange', mapper: (option: any) => option.value })
			])
		]);
	}
}

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Select from '@dojo/widgets/select';
import * as css from '../../styles/tabs.m.css';

export default class SelectTab extends WidgetBase {

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
				w(Select, {
					label: 'Simple string array',
					options: [ 'foo', 'bar', 'baz', 'qux' ]
				}),
				w(Select, {
					label: 'Simple string array (disabled)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					disabled: true
				}),
				w(Select, {
					label: 'Simple string array (native)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					useNativeElement: true
				}),
				w(Select, {
					label: 'Simple string array (native, disabled)',
					options: [ 'foo', 'bar', 'baz', 'qux' ],
					useNativeElement: true,
					disabled: true
				}),
				w(Select, {
					label: 'Complex options array',
					options: this._animals,
					getOptionDisabled: (option: any) => option.disabled,
					getOptionLabel: (option: any) => option.label,
					getOptionValue: (option: any) => option.value
				}),
				w(Select, {
					label: 'Complex options array (native)',
					options: this._animals,
					getOptionDisabled: (option: any) => option.disabled,
					getOptionLabel: (option: any) => option.label,
					getOptionValue: (option: any) => option.value,
					useNativeElement: true
				})
			])
		]);
	}
}

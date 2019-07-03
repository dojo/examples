import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Button from '@dojo/widgets/button';
import Checkbox, { Mode } from '@dojo/widgets/checkbox';
import Radio from '@dojo/widgets/radio';
import Icon from '@dojo/widgets/icon';
import * as css from '../../styles/tabs.m.css';

const factory = create({ icache });

export default factory(function BasicFormTab({ middleware: { icache } }) {
	const togglePressed = icache.getOrSet<boolean>('toggle-pressed', true);
	const checkboxChecked = icache.getOrSet<boolean>('checkbox', true);
	const toggleChecked = icache.getOrSet<boolean>('toggle-checked', true);
	const selectedRadio = icache.getOrSet<string>('radio', 'first');

	function radioChange(value: string) {
		icache.set('radio', value);
	}

	return v('div', { classes: css.root }, [
		v('h2', ['Buttons']),
		v(
			'div',
			{
				classes: css.buttons
			},
			[
				v('h3', ['Enabled']),
				w(Button, {}, ['Basic Button']),
				w(Button, {}, ['Icon Button ', w(Icon, { type: 'searchIcon' })]),
				w(
					Button,
					{
						popup: { expanded: false, id: 'fakeId' }
					},
					['Popup']
				),
				w(
					Button,
					{
						pressed: togglePressed,
						onClick: () => {
							icache.set('toggle-pressed', !togglePressed);
						}
					},
					['Toggle']
				)
			]
		),
		v(
			'div',
			{
				classes: css.buttons
			},
			[
				v('h3', ['Disabled']),
				w(
					Button,
					{
						disabled: true
					},
					['Basic Button']
				),
				w(
					Button,
					{
						disabled: true
					},
					['Icon Button ', w(Icon, { type: 'searchIcon' })]
				),
				w(
					Button,
					{
						disabled: true,
						popup: { expanded: false, id: 'fakeId' }
					},
					['Popup']
				),
				w(
					Button,
					{
						disabled: true,
						pressed: true
					},
					['Toggle']
				)
			]
		),
		v('h2', ['Checkbox']),
		v('div', [
			w(Checkbox, {
				checked: checkboxChecked,
				label: 'Checked checkbox',
				value: 'checkbox-example-1',
				onChange: () => {
					icache.set('checkbox', !checkboxChecked);
				}
			}),
			w(Checkbox, {
				checked: true,
				disabled: true,
				label: 'Disabled checked checkbox',
				value: 'disabled-checkbox-example-1'
			}),
			w(Checkbox, {
				checked: false,
				disabled: true,
				label: 'Disabled unchecked checkbox',
				value: 'disabled-uncheckbox-example-1'
			})
		]),
		v('h2', ['Toggle']),
		v('div', [
			w(Checkbox, {
				checked: toggleChecked,
				label: 'Checkbox in "toggle" mode',
				mode: Mode.toggle,
				onChange: () => {
					icache.set('toggle-checked', !toggleChecked);
				}
			}),
			w(Checkbox, {
				checked: true,
				label: 'Disabled toggle mode checked',
				onLabel: 'On',
				offLabel: 'Off',
				mode: Mode.toggle,
				disabled: true
			}),
			w(Checkbox, {
				checked: false,
				label: 'Disabled toggle mode unchecked',
				onLabel: 'On',
				offLabel: 'Off',
				mode: Mode.toggle,
				disabled: true
			})
		]),
		v('h2', ['Radio']),
		v('div', [
			w(Radio, {
				checked: selectedRadio === 'first',
				value: 'first',
				label: 'First option',
				name: 'sample-radios',
				onChange: radioChange
			}),
			w(Radio, {
				checked: selectedRadio === 'second',
				value: 'second',
				label: 'Second option',
				name: 'sample-radios',
				onChange: radioChange
			}),
			w(Radio, {
				value: 'third',
				label: 'Third option (disabled)',
				disabled: true,
				name: 'sample-radios',
				onChange: radioChange
			})
		])
	]);
});

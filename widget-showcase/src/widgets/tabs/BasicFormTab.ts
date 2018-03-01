import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Button from '@dojo/widgets/button';
import Checkbox, { Mode } from '@dojo/widgets/checkbox';
import Radio from '@dojo/widgets/radio';
import Icon from '@dojo/widgets/icon';
import * as css from '../../styles/basicFormTab.m.css';

export default class BasicFormTab extends WidgetBase {
	private _togglePressed = true;
	private _checkboxChecked = true;
	private _toggleChecked = true;
	private _selectedRadio = 'first';

	private _toggleButtonClick() {
		this._togglePressed = !this._togglePressed;
		this.invalidate();
	}

	private _checkboxChange() {
		this._checkboxChecked = !this._checkboxChecked;
		this.invalidate();
	}

	private _radioChange(value: string) {
		this._selectedRadio = value;
		this.invalidate();
	}

	private _toggleChange() {
		this._toggleChecked = !this._toggleChecked;
		this.invalidate();
	}

	render() {
		return [
			v('h2', [ 'Buttons' ]),
			v('div', {
				classes: css.buttons
			}, [
				v('h3', [ 'Enabled' ]),
				w(Button, {}, [ 'Basic Button' ]),
				w(Button, {}, [
					'Icon Button ',
					w(Icon, { type: 'searchIcon' })
				]),
				w(Button, {
					popup: { expanded: false, id: 'fakeId' }
				}, [ 'Popup' ]),
				w(Button, {
					pressed: this._togglePressed,
					onClick: this._toggleButtonClick
				}, [ 'Toggle' ])
			]),
			v('div', {
				classes: css.buttons
			}, [
				v('h3', [ 'Disabled' ]),
				w(Button, {
					disabled: true
				}, [ 'Basic Button' ]),
				w(Button, {
					disabled: true
				}, [
					'Icon Button ',
					w(Icon, { type: 'searchIcon' })
				]),
				w(Button, {
					disabled: true,
					popup: { expanded: false, id: 'fakeId' }
				}, [ 'Popup' ]),
				w(Button, {
					disabled: true,
					pressed: this._togglePressed,
					onClick: this._toggleButtonClick
				}, [ 'Toggle' ])
			]),
			v('h2', [ 'Checkbox' ]),
			v('div', [
				w(Checkbox, {
					checked: this._checkboxChecked,
					label: 'Checked checkbox',
					value: 'checkbox-example-1',
					onChange: this._checkboxChange
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
			v('h2', [ 'Toggle' ]),
			v('div', [
				w(Checkbox, {
					checked: this._toggleChecked,
					label: 'Checkbox in "toggle" mode',
					mode: Mode.toggle,
					onChange: this._toggleChange
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
			v('h2', [ 'Radio' ]),
			v('div', [
				w(Radio, {
					checked: this._selectedRadio === 'first',
					value: 'first',
					label: 'First option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					checked: this._selectedRadio === 'second',
					value: 'second',
					label: 'Second option',
					name: 'sample-radios',
					onChange: this._radioChange
				}),
				w(Radio, {
					value: 'third',
					label: 'Third option (disabled)',
					disabled: true,
					name: 'sample-radios'
				})
			])
		];
	}
}

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Textarea from '@dojo/widgets/text-area';
import * as css from '../../styles/tabs.m.css';
import { Constructor } from '@dojo/framework/widget-core/interfaces';

export default class TextAreaTab extends WidgetBase {

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

	render() {
		return v('div', { classes: css.root }, [
			v('h2', [ 'Text Areas' ]),
			v('div', [
				this.createInput(Textarea, {
					columns: 40,
					rows: 8,
					placeholder: 'Hello, World',
					label: 'Example text area',
					key: 'text-area'
				}),
				this.createInput(Textarea, {
					columns: 40,
					disabled: true,
					rows: 8,
					value: 'Initial value',
					label: 'Disabled text area',
					key: 'disabled-text-area'
				})
			])
		]);
	}
}

import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Slider from '@dojo/widgets/slider';
import RangeSlider from '@dojo/widgets/range-slider';
import * as css from '../../styles/tabs.m.css';

export default class SliderTab extends WidgetBase {
	private _horizontalValue = 50;
	private _verticalValue = 0;
	private _verticalInvalid = false;
	private _rangeMin = 25;
	private _rangeMax = 75;
	private _range2Min = 150;
	private _range2Max = 250;

	private _onHorizontalInput(value: number) {
		this._horizontalValue = value;
		this.invalidate();
	}

	private _onVerticalInput(value: number) {
		this._verticalValue = value;
		this._verticalInvalid = value > 50;
		this.invalidate();
	}

	private _onRangeInput(minValue: number, maxValue: number) {
		this._rangeMin = minValue;
		this._rangeMax = maxValue;
		this.invalidate();
	}

	private _onRange2Input(minValue: number, maxValue: number) {
		this._range2Min = minValue;
		this._range2Max = maxValue;
		this.invalidate();
	}

	render() {
		return v('div', { classes: css.root }, [
			v('h2', [ 'Text Areas' ]),
			v('div', [
				v('h3', {}, ['Horizontal slider, value: 50']),
				w(Slider, {
					key: 's1',
					label: 'How much do you like tribbles?',
					min: 0,
					max: 100,
					output: (value: number) => {
						if (value < 20) { return 'I am a Klingon'; }
						if (value < 40) { return 'Tribbles only cause trouble'; }
						if (value < 60) { return 'They\`re kind of cute'; }
						if (value < 80) { return 'Most of my salary goes to tribble food'; }
						else { return 'I permanently altered the ecology of a planet for my tribbles'; }
					},
					step: 1,
					value: this._horizontalValue,
					onChange: this._onHorizontalInput,
					onInput: this._onHorizontalInput
				}),
				v('h3', {}, ['Disabled slider, value: 30']),
				w(Slider, {
					label: 'Disabled Slider',
					min: 0,
					max: 100,
					step: 1,
					value: 30,
					disabled: true
				}),
				v('h3', {}, ['Vertical slider with validation']),
				w(Slider, {
					label: 'Vertical Slider with default properties. Anything over 50 is invalid:',
					value: this._verticalValue,
					vertical: true,
					invalid: this._verticalInvalid,
					output: (value: number) => {
						return v('span', {
							innerHTML: this._verticalInvalid ? value + ' !' : value + ''
						});
					},
					outputIsTooltip: true,
					onChange: this._onVerticalInput,
					onInput: this._onVerticalInput
				}),
				v('h3', {}, ['Range Slider']),
				w(RangeSlider, {
					label: 'Range Slider with default properties.',
					minValue: this._rangeMin,
					maxValue: this._rangeMax,
					onChange: this._onRangeInput,
					onInput: this._onRangeInput,
					showOutput: true,
					output: (minValue: number, maxValue: number) => {
						return v('span', {
							innerHTML: `${minValue}, ${maxValue}`
						});
					}
				}),
				w(RangeSlider, {
					label: 'Range Slider with output as tooltip, step.',
					min: 100,
					max: 500,
					step: 50,
					invalid: this._range2Max - this._range2Min == 50,
					minValue: this._range2Min,
					maxValue: this._range2Max,
					onChange: this._onRange2Input,
					onInput: this._onRange2Input,
					outputIsTooltip: true,
					showOutput: true,
					output: (minValue: number, maxValue: number) => {
						return v('span', {
							innerHTML: `${minValue} thru ${maxValue}`
						});
					}
				})
			])
		]);
	}
}

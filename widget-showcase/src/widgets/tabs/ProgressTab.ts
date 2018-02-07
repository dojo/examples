import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Progress from '@dojo/widgets/progress/Progress';

export default class ProgressTab extends WidgetBase {
	private _customOutputMax = 750;

	private _customOutput(value: number, percent: number) {
		return `${value} of ${this._customOutputMax} is ${percent}%`;
	}

	render() {
		return [
			v('h2', [ 'Progress Bars' ]),
			v('div', [
				v('h3', {}, ['value: 50%']),
				w(Progress, { value: 50 }),
				v('h3', {}, ['value: 0.3, max: 1']),
				w(Progress, { value: 0.3, max: 1 }),
				v('h3', {}, ['value: 250, custom output function']),
				w(Progress, {
					value: 250,
					max: this._customOutputMax,
					output: this._customOutput
				}),
				v('h3', {}, ['value: 10, showOutput: false']),
				w(Progress, { value: 10, showOutput: false })
			])
		];
	}
}

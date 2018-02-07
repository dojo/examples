import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Textarea from '@dojo/widgets/textarea/Textarea';

export default class TextAreaTab extends WidgetBase {

	render() {
		return [
			v('h2', [ 'Text Areas' ]),
			v('div', [
				w(Textarea, {
					columns: 40,
					rows: 8,
					placeholder: 'Hello, World',
					label: 'Example text area'
				}),
				w(Textarea, {
					columns: 40,
					disabled: true,
					rows: 8,
					value: 'Initial value',
					label: 'Disabled text area'
				})
			])
		];
	}
}

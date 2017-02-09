import { padStart } from '@dojo/shim/string';
import { v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

interface FormattedDateProperties {
	date: Date;
}

export default class FormattedDate extends WidgetBase<FormattedDateProperties> {
	render() {
		const { date = new Date() } = this.properties;
		let hours = date.getHours();
		const minutes = String(date.getMinutes());
		let suffix = 'am';

		if (hours >= 12) {
			suffix = 'pm';

			hours = hours % 12;
			if (!hours) {
				hours = 12;
			}
		}

		return v('span', {
			innerHTML: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${hours}:${padStart(minutes, 2, '0')}${suffix}`
		});
	}
}

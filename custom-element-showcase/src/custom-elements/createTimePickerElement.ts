import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import TimePicker from '@dojo/widgets/timepicker/TimePicker';

export default function createTimePickerElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-timepicker',
		widgetConstructor: TimePicker,
		events: [
			{
				propertyName: 'onChange',
				eventName: 'change'
			},
			{
				propertyName: 'onClick',
				eventName: 'click'
			}
		]
	};
};

import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Slider from '@dojo/widgets/slider/Slider';

export default function createSliderElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-slider',
		widgetConstructor: Slider,
		events: [
			{
				propertyName: 'onInput',
				eventName: 'input'
			},
			{
				propertyName: 'onClick',
				eventName: 'click'
			}
		]
	};
};

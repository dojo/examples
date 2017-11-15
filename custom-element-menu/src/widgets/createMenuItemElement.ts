import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import { MenuItem } from './MenuItem';

export default function createMenuItemElement(): CustomElementDescriptor {
	return {
		tagName: 'demo-menu-item',
		widgetConstructor: MenuItem,
		attributes: [
			{
				attributeName: 'title'
			},
			{
				attributeName: 'selected',
				value: value => typeof value === 'string' || value === true
			}
		],
		properties: [
			{
				propertyName: 'data'
			}
		],
		events: [
			{
				propertyName: 'onSelected',
				eventName: 'selected'
			}
		]
	};
};

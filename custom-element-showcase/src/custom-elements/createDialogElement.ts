import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import Dialog from '@dojo/widgets/dialog/Dialog';

export default function createDialogElement(): CustomElementDescriptor {
	return {
		tagName: 'dojo-dialog',
		widgetConstructor: Dialog,
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

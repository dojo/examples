import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';

export type Icon = Widget<WidgetState>;

export interface IconFactory extends ComposeFactory<Icon, WidgetOptions<WidgetState>> { }

const createIcon: IconFactory = createWidget
	.extend({
		tagName: 'i'
	});

export default createIcon;

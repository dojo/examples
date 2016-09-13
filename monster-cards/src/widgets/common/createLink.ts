import { ComposeFactory } from 'dojo-compose/compose';
import createWidget, { Widget, WidgetState, WidgetOptions } from 'dojo-widgets/createWidget';

export type Link = Widget<WidgetState>;

export interface LinkFactory extends ComposeFactory<Link, WidgetOptions<WidgetState>> { }

const createLink: LinkFactory = createWidget
	.extend({
		tagName: 'a'
	});

export default createLink;

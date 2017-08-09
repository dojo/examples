import { w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import HackerNewsStoryPageOutlet from '../outlets/HackerNewsStoryPageOutlet';

export default class HackerNewsApp extends WidgetBase<WidgetProperties> {

	protected render(): DNode {
		return w(HackerNewsStoryPageOutlet, {});
	}
}

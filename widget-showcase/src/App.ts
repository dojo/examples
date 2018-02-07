import { w, v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Tabs from './widgets/Tabs';
import Toolbar from '@dojo/widgets/toolbar/Toolbar';
import Splitter from './widgets/Splitter';
import Accordion, { AccordionProperties } from './widgets/Accordion';

export interface AppProperties extends AccordionProperties {};

export default class App extends WidgetBase<AppProperties> {
	render() {
		const {
			themes,
			currentTheme,
			onThemeChange
		} = this.properties;

		return w(Toolbar, {
			collapseWidth: 700,
			fixed: true,
			menuTitle: 'Menu',
			title: 'Dojo 2 Widget Showcase'
		}, [
			w(Splitter, {
				leading: w(Accordion, {
					themes,
					currentTheme,
					onThemeChange
				}),
				trailing: w(Tabs, {})
			})
		]);
	}
}

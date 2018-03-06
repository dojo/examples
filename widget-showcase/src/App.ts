import { w, v } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Tabs from './widgets/Tabs';
import Toolbar from '@dojo/widgets/toolbar';
import SplitPane, { Direction } from '@dojo/widgets/split-pane';
import Accordion, { AccordionProperties } from './widgets/Accordion';

export interface AppProperties extends AccordionProperties {};

export default class App extends WidgetBase<AppProperties> {
	private _size = 300;

	private _onResize(size: number) {
		this._size = size;
		this.invalidate();
	}

	render() {
		const {
			themes,
			currentTheme,
			onThemeChange
		} = this.properties;

		return [
			w(Toolbar, {
				collapseWidth: 700,
				fixed: true,
				heading: 'Dojo 2 Widget Showcase'
			}),
			w(SplitPane, {
				key: 'split-pane',
				direction: Direction.column,
				size: this._size,
				onResize: this._onResize
			}, [
				w(Accordion, {
					themes,
					currentTheme,
					onThemeChange
				}),
				w(Tabs, {})
			])
		];
	}
}

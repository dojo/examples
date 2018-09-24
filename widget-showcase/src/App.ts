import { w, v } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import Tabs from './widgets/Tabs';
import Toolbar from '@dojo/widgets/toolbar';
import SplitPane, { Direction } from '@dojo/widgets/split-pane';
import Accordion, { AccordionProperties } from './widgets/Accordion';
import * as css from './styles/app.m.css';

export interface AppProperties extends AccordionProperties {};

export default class App extends WidgetBase<AppProperties> {
	private _size = 360;

	private _onResize(size: number) {
		this._size = size;
		this.invalidate();
	}

	protected render() {
		const {
			themes,
			onThemeChange
		} = this.properties;

		return [
			v('div', { classes: css.app }, [
				v('div', { classes: css.toolbarHolder }, [
					w(Toolbar, {
						collapseWidth: 700,
						heading: 'Dojo Widget Showcase'
					})
				]),
				v('div', { classes: css.splitPaneHolder }, [
					w(SplitPane, {
						key: 'split-pane',
						direction: Direction.column,
						size: this._size,
						onResize: this._onResize
					}, [
						w(Accordion, {
							themes,
							onThemeChange
						}),
						w(Tabs, {})
					])
				])
			])
		];
	}
}

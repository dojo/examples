import AccordionPane, { AccordionPaneProperties } from '@dojo/widgets/accordion-pane';
import TitlePane from '@dojo/widgets/title-pane';
import { v, w } from '@dojo/framework/widget-core/d';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { Set } from '@dojo/framework/shim/Set';
import CalendarPane from './panes/CalendarPane';
import DialogPane from './panes/DialogPane';
import ThemePane, { ThemePaneProperties } from './panes/ThemePane';
import { from } from '@dojo/framework/shim/array';

export interface AccordionProperties {
	themes: string[];
	onThemeChange: (theme: string) => void;
}
;

export default class Accordion extends WidgetBase<AccordionProperties> {
	private _openKeys = new Set<string>();
	private _currentTheme = 'dojo';

	private _requestOpen(key: string) {
		this._openKeys.add(key);
		this.invalidate();
	}

	private _requestClose(key: string) {
		this._openKeys.delete(key);
		this.invalidate();
	}

	private _onThemeChange(theme: string) {
		const { onThemeChange } = this.properties;
		this._currentTheme = theme;
		onThemeChange(theme);
	}

	render() {
		const {
			themes,
			onThemeChange
		} = this.properties;

		return w(AccordionPane, {
			onRequestOpen: this._requestOpen,
			onRequestClose: this._requestClose,
			openKeys: from(this._openKeys)
		}, [
			w(TitlePane, {
				title: 'Theme',
				key: 'theme-title-pane'
			}, [ w(ThemePane, {
				themes,
				currentTheme: this._currentTheme,
				onThemeChange
			}) ]),
			w(TitlePane, {
				title: 'Calendar',
				key: 'calendar-title-pane'
			}, [ w(CalendarPane, {}) ]),
			w(TitlePane, {
				title: 'Dialog',
				key: 'dialog-title-pane'
			}, [ w(DialogPane, {}) ]),
		])

	}
}

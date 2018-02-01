import AccordionPane from '@dojo/widgets/accordionpane/AccordionPane';
import TitlePane from '@dojo/widgets/titlepane/TitlePane';
import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Set } from '@dojo/shim/Set';
import CalendarPane from './panes/CalendarPane';
import DialogPane from './panes/DialogPane';

export default class Accordion extends WidgetBase {
	private _openKeys = new Set<string>();

	private _requestOpen(key: string) {
		this._openKeys.add(key);
		this.invalidate();
	}

	private _requestClose(key: string) {
		this._openKeys.delete(key);
		this.invalidate();
	}

	render() {
		return w(AccordionPane, {
			onRequestOpen: this._requestOpen,
			onRequestClose: this._requestClose,
			openKeys: Array.from(this._openKeys)
		}, [
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

import AccordionPane from '@dojo/widgets/accordionpane/AccordionPane';
import TitlePane from '@dojo/widgets/titlepane/TitlePane';
import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { Set } from '@dojo/shim/Set';

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
			}, [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales ante sed massa finibus, at euismod ex molestie. Donec sagittis ligula at lorem blandit imperdiet. Aenean sapien justo, blandit at aliquet a, tincidunt ac nulla. Donec quis dapibus est. Donec id massa eu nisl cursus ornare quis sit amet velit.' ]),
			w(TitlePane, {
				title: 'Dialog',
				key: 'dialog-title-pane'
			}, [ 'Ut non lectus vitae eros hendrerit pellentesque. In rhoncus ut lectus id tempus. Cras eget mauris scelerisque, condimentum ante sed, vehicula tellus. Donec congue ligula felis, a porta felis aliquet nec. Nulla mi lorem, efficitur nec lectus vehicula, vehicula varius eros.' ])
		])

	}
}

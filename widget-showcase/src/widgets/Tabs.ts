import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Tab from '@dojo/widgets/tab';
import TabController, { Align } from '@dojo/widgets/tab-controller';
import BasicFormTab from './tabs/BasicFormTab';
import TextInputTab from './tabs/TextInputTab';
import TextAreaTab from './tabs/TextAreaTab';
import SelectTab from './tabs/SelectTab';
import ProgressTab from './tabs/ProgressTab';
import SliderTab from './tabs/SliderTab';

export default class Tabs extends WidgetBase {
	private _activeIndex = 0;

	private _requestTabChange(activeIndex: number) {
		this._activeIndex = activeIndex;
		this.invalidate();
	}

	render() {
		return w(TabController, {
			alignButtons: Align.top,
			activeIndex: this._activeIndex,
			onRequestTabChange: this._requestTabChange
		}, [
			w(Tab, {
				key: 'button-tab',
				label: 'Basic Form Widgets'
			}, [ w(BasicFormTab, {}) ]),
			w(Tab, {
				key: 'input-tab',
				label: 'Text Input Widgets'
			}, [ w(TextInputTab, {}) ]),
			w(Tab, {
				key: 'text-area-tab',
				label: 'Text Area'
			}, [ w(TextAreaTab, {}) ]),
			w(Tab, {
				key: 'select-tab',
				label: 'Selects'
			}, [ w(SelectTab, {}) ]),
			w(Tab, {
				key: 'progress-tab',
				label: 'Progress'
			}, [ w(ProgressTab, {}) ]),
			w(Tab, {
				key: 'slider-tab',
				label: 'Slider'
			}, [ w(SliderTab, {}) ])
		])
	}
}

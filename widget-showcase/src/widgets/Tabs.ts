import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Tab from '@dojo/widgets/tabcontroller/Tab';
import TabController, { Align } from '@dojo/widgets/tabcontroller/TabController';
import BasicFormTab from './tabs/BasicFormTab';

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
			}, [
				v('h2', [ 'Inputs' ])
			]),
			w(Tab, {
				key: 'select-tab',
				label: 'Selects'
			}, [
				v('h2', [ 'Selects' ])
			])
		])
	}
}

import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Tab from '@dojo/widgets/tabcontroller/Tab';
import TabController, { Align } from '@dojo/widgets/tabcontroller/TabController';

export default class Tabs extends WidgetBase {
	render() {
		return w(TabController, {
			alignButtons: Align.top,
			activeIndex: 0
		}, [
			w(Tab, {
				key: 'default',
				label: 'Default'
			}, [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in ex pharetra, iaculis turpis eget, tincidunt lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
			]),
			w(Tab, {
				disabled: true,
				key: 'disabled',
				label: 'Disabled'
			}, [
				'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
			]),
			w(Tab, {
				key: 'foo',
				label: 'Foobar'
			}, [
				'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
			])
		])
	}
}

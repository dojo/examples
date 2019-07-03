import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Tab from '@dojo/widgets/tab';
import TabController, { Align } from '@dojo/widgets/tab-controller';
import BasicFormTab from './tabs/BasicFormTab';
import TextInputTab from './tabs/TextInputTab';
import TextAreaTab from './tabs/TextAreaTab';
import SelectTab from './tabs/SelectTab';
import ProgressTab from './tabs/ProgressTab';
import SliderTab from './tabs/SliderTab';
import GridTab from './tabs/GridTab';

const factory = create({ icache });

export default factory(function Tabs({ middleware: { icache } }) {
	const activeIndex = icache.get<number>('active') || 0;

	return w(
		TabController,
		{
			alignButtons: Align.top,
			activeIndex: activeIndex,
			onRequestTabChange: (index: number) => {
				icache.set('active', index);
			}
		},
		[
			w(
				Tab,
				{
					key: 'button-tab',
					label: 'Basic Form Widgets'
				},
				[w(BasicFormTab, {})]
			),
			w(
				Tab,
				{
					key: 'input-tab',
					label: 'Text Input Widgets'
				},
				[w(TextInputTab, {})]
			),
			w(
				Tab,
				{
					key: 'text-area-tab',
					label: 'Text Area'
				},
				[w(TextAreaTab, {})]
			),
			w(
				Tab,
				{
					key: 'select-tab',
					label: 'Selects'
				},
				[w(SelectTab, {})]
			),
			w(
				Tab,
				{
					key: 'progress-tab',
					label: 'Progress'
				},
				[w(ProgressTab, {})]
			),
			w(
				Tab,
				{
					key: 'slider-tab',
					label: 'Slider'
				},
				[w(SliderTab, {})]
			),
			w(
				Tab,
				{
					key: 'grid-tab',
					label: 'Grid'
				},
				[w(GridTab, {})]
			)
		]
	);
});

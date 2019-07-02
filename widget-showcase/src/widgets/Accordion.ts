import { create, w } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import AccordionPane from '@dojo/widgets/accordion-pane';
import TitlePane from '@dojo/widgets/title-pane';
import { Set } from '@dojo/framework/shim/Set';
import CalendarPane from './panes/CalendarPane';
// import DialogPane from './panes/DialogPane';
import ThemePane from './panes/ThemePane';
import { from } from '@dojo/framework/shim/array';

const factory = create({ icache });

export default factory(function Accordion({ middleware: { icache } }) {
	const openKeys = icache.getOrSet<Set<string>>('keys', new Set<string>())!;

	return w(
		AccordionPane,
		{
			onRequestOpen: (key: string) => {
				const keys = icache.get<Set<string>>('keys')!;
				keys.add(key);
				icache.set('keys', keys);
			},
			onRequestClose: (key: string) => {
				const keys = icache.get<Set<string>>('keys')!;
				keys.delete(key);
				icache.set('keys', keys);
			},
			openKeys: from(openKeys)
		},
		[
			w(
				TitlePane,
				{
					title: 'Theme',
					key: 'theme-title-pane'
				},
				[w(ThemePane, {})]
			),
			w(
				TitlePane,
				{
					title: 'Calendar',
					key: 'calendar-title-pane'
				},
				[w(CalendarPane, {})]
			)
			// w(TitlePane, {
			// 	title: 'Dialog',
			// 	key: 'dialog-title-pane'
			// }, [ w(DialogPane, {}) ]),
		]
	);
});

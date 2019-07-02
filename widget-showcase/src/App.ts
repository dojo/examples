import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import theme from '@dojo/framework/core/middleware/theme';

import Tabs from './widgets/Tabs';
import Toolbar from '@dojo/widgets/toolbar';
import SplitPane, { Direction } from '@dojo/widgets/split-pane';
import Accordion from './widgets/Accordion';
import * as css from './styles/app.m.css';
import dojo from '@dojo/themes/dojo';

const factory = create({ icache, theme });

export default factory(function App({ middleware: { icache, theme } }) {
	const size = icache.get<number>('size') || 360;
	if (!theme.get()) {
		theme.set(dojo);
	}

	return v('div', { classes: css.app }, [
		v('div', { classes: css.toolbarHolder }, [
			w(Toolbar, {
				collapseWidth: 700,
				heading: 'Dojo Widget Showcase'
			})
		]),
		v('div', { classes: css.splitPaneHolder }, [
			w(
				SplitPane,
				{
					key: 'split-pane',
					direction: Direction.column,
					size,
					onResize: (size: number) => {
						icache.set('size', size);
					}
				},
				[w(Accordion, {}), w(Tabs, {})]
			)
		])
	]);
});

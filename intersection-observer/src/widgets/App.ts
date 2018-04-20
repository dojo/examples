import { v, w } from '@dojo/widget-core/d';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import { getListItems } from '../listItemGenerator';
import InfiniteList from './InfiniteList';

import * as css from './styles/app.m.css';

/**
 * The main widget of this application. This widget contains and feeds data to our infinite list.
 */
export class App extends WidgetBase {
	protected render() {
		return v('div', { classes: css.root }, [
			v('h1', { classes: css.title }, ['Infinite Scrolling List']),
			w(InfiniteList, { onRequestItems: this.onRequestItems.bind(this) })
		]);
	}

	private async onRequestItems(startIndex: number) {
		const articles = await getListItems();

		return articles.map(({ title, summary }, index) =>
			v('div', { key: `article-${startIndex + index}`, classes: css.itemRoot }, [
				v('h2', { classes: css.itemTitle }, [title]),
				v('p', { classes: css.itemSummary }, [summary])
			])
		);
	}
}

export default App;

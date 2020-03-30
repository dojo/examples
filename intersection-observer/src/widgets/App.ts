import { create, w, v } from '@dojo/framework/core/vdom';
import { createICacheMiddleware } from '@dojo/framework/core/middleware/icache';
import { getListItems } from '../listItemGenerator';
import InfiniteList from './InfiniteList';

import * as css from './styles/app.m.css';

interface AppState {
	data: { title: string; summary: string }[];
	loading: boolean;
}

const icache = createICacheMiddleware<AppState>();
const factory = create({ icache });

export default factory(function App({ middleware: { icache } }) {
	const data = icache.getOrSet('data', getListItems);
	const isLoading = icache.get('loading') || false;

	return v('div', { classes: css.root }, [
		v('h1', { classes: css.title }, ['Infinite Scrolling List']),
		data !== undefined &&
			w(InfiniteList, {
				isLoading,
				data,
				onRequestItems: async () => {
					icache.set('loading', true);
					const newData = await getListItems();
					const data = icache.get('data') || [];
					icache.set('loading', false);
					icache.set('data', [...data, ...newData]);
				}
			})
	]);
});

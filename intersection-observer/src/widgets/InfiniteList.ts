import { create, v, w } from '@dojo/framework/core/vdom';
import intersection from '@dojo/framework/core/middleware/intersection';

import Item from './Item';
import * as css from './styles/infiniteList.m.css';

export interface InfiniteListProperties {
	onRequestItems(): Promise<void>;
	data: any[];
	isLoading: boolean;
}

const factory = create({ intersection }).properties<InfiniteListProperties>();

export default factory(function InfiniteList({ middleware: { intersection }, properties }) {
	const { onRequestItems, data, isLoading } = properties();
	const { isIntersecting } = intersection.get('bottom');

	if (isIntersecting && !isLoading) {
		onRequestItems();
	}

	return v('div', {}, [
		v(
			'div',
			{ key: 'data' },
			data.map(({ title, summary }, i) => w(Item, { key: i, title, summary }))
		),
		v('div', { key: 'bottom', classes: css.bottom })
	]);
});

import { create, v } from '@dojo/framework/core/vdom';

import * as css from './styles/Item.m.css';

interface ItemProperties {
	title: string;
	summary: string;
}

const factory = create().properties<ItemProperties>();

export default factory(function Item({ properties }) {
	const { title, summary } = properties();
	return v('div', { classes: css.root }, [
		v('h2', { classes: css.title }, [title]),
		v('p', { classes: css.summary }, [summary])
	]);
});

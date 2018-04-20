import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import Intersection from '@dojo/widget-core/meta/Intersection';
import WidgetBase from '@dojo/widget-core/WidgetBase';

import * as css from './styles/infiniteList.m.css';

export interface InfiniteListProperties {
	onRequestItems(startIndex: number): Promise<DNode[]>;
}

/**
 * Infinite list widget. The widget simply has an element at the bottom that, when is detected to be on the screen,
 * causes a request for more data.  To keep things simple, it is the responsibility of the containing widget to provide
 * more data.
 */
export class InfiniteList extends WidgetBase<InfiniteListProperties> {
	items: DNode[] = [];
	isLoadingData = false;

	protected render() {
		const { isIntersecting } = this.meta(Intersection).get('bottom');

		if (isIntersecting && !this.isLoadingData) {
			this.isLoadingData = true;
			this.properties.onRequestItems(this.items.length).then(items => {
				this.items = this.items.concat(items);
				this.isLoadingData = false;
				this.invalidate();
			});
		}

		return v('div', {}, [
			...this.items,
			v('div', { key: 'bottom', classes: css.bottom })
		]);
	}
}

export default InfiniteList;

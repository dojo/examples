import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import { DNode } from '@dojo/widget-core/interfaces';
import { FetchFeedPayload } from '../processes/interfaces';

interface FeedPaginationProperties {
	type: string;
	username: string;
	tag?: string;
	total: number;
	currentPage: number;
	fetchFeed: (opts: FetchFeedPayload) => void;
}

export class FeedPagination extends WidgetBase<FeedPaginationProperties> {
	protected render() {
		const { total, currentPage, fetchFeed, type, username, tag } = this.properties;

		let pageNumbers: DNode[] = [];
		for (let page = 0; page < Math.ceil(total / 10); page++) {
			const isActive = currentPage === page;
			const onclick = (event: MouseEvent) => {
				event.preventDefault();
				if (page !== currentPage) {
					fetchFeed({ type, page, filter: tag || username });
				}
			};
			pageNumbers.push(
				v('li', { key: page, classes: ['page-item', isActive ? 'active' : null] }, [
					v('a', { href: '', onclick, classes: 'page-link' }, [`${page + 1}`])
				])
			);
		}

		return v('nav', [v('ul', { classes: 'pagination' }, pageNumbers)]);
	}
}

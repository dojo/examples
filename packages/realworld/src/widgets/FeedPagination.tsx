import { create, tsx } from '@dojo/framework/core/vdom';
import { DNode } from '@dojo/framework/core/interfaces';

interface FeedPaginationProperties {
	total: number;
	currentPage: number;
	fetchFeed: (page: number) => void;
}

const factory = create({}).properties<FeedPaginationProperties>();

export const FeedPagination = factory(function ({ properties }) {
	const { total, currentPage, fetchFeed } = properties();

	const pageNumbers: DNode[] = [];
	for (let page = 0; page < Math.ceil(total / 10); page++) {
		const isActive = currentPage === page;
		const onclick = (event: MouseEvent) => {
			event.preventDefault();
			if (page !== currentPage) {
				fetchFeed(page);
			}
		};
		pageNumbers.push(
			<li key={page} classes={['page-item', isActive && 'active']}>
				<a href="" onclick={onclick} classes={['page-link']}>
					{`${page + 1}`}
				</a>
			</li>
		);
	}

	return (
		<nav>
			<ul classes={['pagination']}>{pageNumbers}</ul>
		</nav>
	);
});

export default FeedPagination;

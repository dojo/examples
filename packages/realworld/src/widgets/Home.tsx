import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import store from '../store';
import FeedList from './FeedList';
import { Tags } from './Tags';
import { Banner } from './Banner';
import { FeedPagination } from './FeedPagination';
import { fetchFeedProcess } from '../processes/feedProcesses';

const factory = create({ store, icache });

export const Home = factory(function Home({ middleware: { store } }) {
	const { get, path, executor } = store;
	const isAuthenticated = !!get(path('session', 'token'));
	const username = get(path('session', 'username'));
	const articles = get(path('feed', 'items')) || [];
	const tagName = get(path('feed', 'tagName'));
	const loaded = get(path('feed', 'isLoaded')) || false;
	const loading = get(path('feed', 'isLoading')) || false;
	const type = get(path('feed', 'category')) || (isAuthenticated ? 'feed' : 'global');

	if (articles.length === 0 && !loading && !loaded) {
		executor(fetchFeedProcess)({ type, filter: username, page: 0 });
		return null;
	}

	const currentPage = get(path('feed', 'page')) || 0;
	const total = get(path('feed', 'total')) || 0;

	if (type)
		return (
			<div classes={['home-page']}>
				<Banner />
				<div classes={['container', 'page']}>
					<div classes={['row']}>
						<div classes={['col-md-9']}>
							<div classes={['feed-toggle']}>
								<ul classes={['nav', 'nav-pills', 'outline-active']}>
									{isAuthenticated && (
										<li key="feeds" classes={['nav-item']}>
											<a
												href=""
												onclick={(event: MouseEvent) => {
													event.preventDefault();
													executor(fetchFeedProcess)({
														page: 0,
														type: 'feed',
														filter: username
													});
												}}
												classes={['nav-link', type === 'feed' && 'active']}
											>
												Your Feed
											</a>
										</li>
									)}

									<li key="global" classes={['nav-item']}>
										<a
											href=""
											onclick={(event: MouseEvent) => {
												event.preventDefault();
												executor(fetchFeedProcess)({
													page: 0,
													type: 'global',
													filter: username
												});
											}}
											classes={['nav-link', type === 'global' && 'active']}
										>
											Global Feed
										</a>
									</li>
									{tagName && (
										<li key="tags" classes={['nav-item']}>
											<a classes={['nav-link', 'active']}>{`#${tagName}`}</a>
										</li>
									)}
								</ul>
							</div>
							<div classes={['home-global']}>
								{loading ? (
									<div classes={['article-preview']}>Loading... </div>
								) : (
									<FeedList type={type} articles={articles} />
								)}
							</div>
							{!loading && (
								<FeedPagination
									total={total}
									currentPage={currentPage}
									fetchFeed={(page: number) => {
										executor(fetchFeedProcess)({
											type,
											filter: type === 'tag' ? tagName : username,
											page
										});
									}}
								/>
							)}
						</div>
						<Tags />
					</div>
				</div>
			</div>
		);
});

export default Home;

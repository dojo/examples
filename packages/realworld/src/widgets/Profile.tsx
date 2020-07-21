import { create, tsx } from '@dojo/framework/core/vdom';
import { Link } from '@dojo/framework/routing/Link';
import { ActiveLink } from '@dojo/framework/routing/ActiveLink';
import FeedList from './FeedList';
import store from '../store';
import { getProfileFeedProcess, getProfileProcess, followUserProcess } from '../processes/profileProcesses';
import { FeedPagination } from './FeedPagination';

export interface ProfileProperties {
	username: string;
	type: string;
}

const factory = create({ store }).properties<ProfileProperties>();

export const Profile = factory(function Profile({ middleware: { store }, properties }) {
	const { get, path, executor } = store;
	const isLoading = get(path('profile', 'user', 'isLoading'));
	const profileUser = get(path('profile', 'user', 'username'));
	const feed = get(path('profile', 'feed'));
	const currentUser = get(path('session', 'username'));
	const { username, type } = properties();

	if (username !== profileUser && !isLoading) {
		executor(getProfileProcess)({ username, type, page: 0 });
		return null;
	} else if (type !== feed.category && !feed.isLoading) {
		executor(getProfileFeedProcess)({ username, type, page: 0 });
	}
	const isCurrentUser = currentUser === profileUser;
	const currentPage = get(path('profile', 'feed', 'page')) || 0;
	const total = get(path('profile', 'feed', 'total')) || 0;
	const image = get(path('profile', 'user', 'image'));
	const bio = get(path('profile', 'user', 'bio'));
	const following = get(path('profile', 'user', 'following'));

	return (
		<div classes={['profile-page']}>
			<div classes={['user-info']}>
				<div classes={['container']}>
					<div classes={['row']}>
						<div classes={['col-xs-12', 'col-md-10', 'offset-md-1']}>
							<img src={image} classes={['user-img']} />
							<h4>{username}</h4>
							<p>{bio}</p>
							{isCurrentUser ? (
								<Link classes={['btn', 'btn-sm', 'btn-outline-secondary', 'action-btn']} to="settings">
									<i classes={['ion-edit']} />
									{' Edit Profile Settings'}
								</Link>
							) : (
								<button
									onclick={() => {
										executor(followUserProcess)({
											following,
											username
										});
									}}
									classes={[
										'btn',
										'btn-sm',
										'action-btn',
										following ? 'btn-secondary' : 'btn-outline-secondary'
									]}
								>
									<i classes={['ion-plus-round']}></i>
									{following ? ' Unfollow ' : ' Follow '}
									{username}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
			<div classes={['container']}>
				<div classes={['row']}>
					<div classes={['col-xs-12', 'col-md-10', 'offset-md-1']}>
						<div classes={['articles-toggle']}>
							<ul classes={['nav', 'nav-pills', 'outline-active']}>
								<li classes={['nav-item']}>
									<ActiveLink
										to="user"
										classes={['nav-link']}
										params={{ username }}
										activeClasses={['active']}
									>
										My Articles
									</ActiveLink>
								</li>
								<li classes={['nav-item']}>
									<ActiveLink
										to="favorites"
										classes={['nav-link']}
										params={{ username }}
										activeClasses={['active']}
									>
										Favorited Articles
									</ActiveLink>
								</li>
							</ul>
						</div>
						<div classes={['profile-page']}>
							{feed.isLoading ? (
								<div classes={['article-preview']}>Loading... </div>
							) : (
								<FeedList type={type} articles={feed.items || []} />
							)}
						</div>
						{!feed.isLoading && (
							<FeedPagination
								total={total}
								currentPage={currentPage}
								fetchFeed={(page: number) => {
									executor(getProfileFeedProcess)({
										type,
										username,
										page
									});
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export default Profile;

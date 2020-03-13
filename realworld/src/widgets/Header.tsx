import { create, tsx } from '@dojo/framework/core/vdom';
import ActiveLink from '@dojo/framework/routing/ActiveLink';
import store from '../store';

const factory = create({ store }).properties();

export const Header = factory(function Factory({ middleware: { store } }) {
	const { get, path } = store;
	const isAuthenticated = !!get(path('session', 'token'));
	const loggedInUser = get(path('session', 'username'));

	return (
		<nav classes={['navbar', 'navbar-light']}>
			<div classes={['container']}>
				<a classes={['navbar-brand']}>conduit</a>
				<ul classes={['nav', 'navbar-nav pull-xs-right']}>
					<li classes={['nav-item']}>
						<ActiveLink classes={['nav-link']} activeClasses={['active']} to="home">
							Home
						</ActiveLink>
					</li>
					{isAuthenticated && (
						<li classes={['nav-item']}>
							<ActiveLink classes={['nav-link']} activeClasses={['active']} to="new-post">
								New Post
								<i classes={['ion-compose']} />
							</ActiveLink>
						</li>
					)}
					{isAuthenticated && (
						<li classes={['nav-item']}>
							<ActiveLink classes={['nav-link']} activeClasses={['active']} to="settings">
								Settings
								<i classes={['ion-gear']} />
							</ActiveLink>
						</li>
					)}
					{isAuthenticated && (
						<li classes={['nav-item']}>
							<ActiveLink
								classes={['nav-link']}
								activeClasses={['active']}
								to="user"
								params={{ username: loggedInUser }}
							>
								{loggedInUser}
								<i classes={['ion-gear']} />
							</ActiveLink>
						</li>
					)}
					{!isAuthenticated && (
						<li classes={['nav-item']}>
							<ActiveLink classes={['nav-link']} activeClasses={['active']} to="login">
								Login
							</ActiveLink>
						</li>
					)}
					{!isAuthenticated && (
						<li classes={['nav-item']}>
							<ActiveLink classes={['nav-link']} activeClasses={['active']} to="register">
								Register
							</ActiveLink>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
});

export default Header;

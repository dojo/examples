import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import { Outlet } from '@dojo/framework/routing/Outlet';

import HeaderContainer from './containers/HeaderContainer';
import SettingsContainer from './containers/SettingsContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import ProfileContainer from './containers/ProfileContainer';
import EditorContainer from './containers/EditorContainer';
import ArticleContainer from './containers/ArticleContainer';
import { Home } from './widgets/Home';
import { Footer } from './widgets/Footer';
import { MatchDetails } from '@dojo/framework/routing/interfaces';

export class App extends WidgetBase {
	protected render() {
		return v('div', [
			w(HeaderContainer, {}),
			w(Outlet, {
				id: 'login',
				renderer: () => {
					return w(LoginContainer, {});
				}
			}),
			w(Outlet, {
				id: 'register',
				renderer: () => {
					return w(RegisterContainer, {});
				}
			}),
			w(Outlet, {
				id: 'user',
				renderer: (details: MatchDetails) => {
					if (details.isExact()) {
						return w(ProfileContainer, { type: 'user', username: details.params.username });
					}
				}
			}),
			w(Outlet, {
				id: 'favorites',
				renderer: (details: MatchDetails) => {
					return w(ProfileContainer, { type: 'favorites', username: details.params.username });
				}
			}),
			w(Outlet, {
				id: 'edit-post',
				renderer: (details: MatchDetails) => {
					return w(EditorContainer, { slug: details.params.slug });
				}
			}),
			w(Outlet, {
				id: 'new-post',
				renderer: (details: MatchDetails) => {
					if (details.isExact()) {
						return w(EditorContainer, { slug: details.params.slug });
					}
				}
			}),
			w(Outlet, {
				id: 'article',
				renderer: (details: MatchDetails) => {
					return w(ArticleContainer, { slug: details.params.slug });
				}
			}),
			w(Outlet, {
				id: 'settings',
				renderer: () => {
					return w(SettingsContainer, {});
				}
			}),
			w(Outlet, {
				id: 'home',
				renderer: (details: MatchDetails) => {
					if (details.isExact()) {
						return w(Home, {});
					}
				}
			}),
			w(Footer, {})
		]);
	}
}

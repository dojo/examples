import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';

import HeaderContainer from './containers/HeaderContainer';
import { HomeOutlet } from './outlets/HomeOutlet';
import { LoginOutlet } from './outlets/LoginOutlet';
import { UserProfileOutlet, FavProfileOutlet } from './outlets/ProfileOutlet';
import { RegisterOutlet } from './outlets/RegisterOutlet';
import { EditorEditOutlet, EditorNewOutlet } from './outlets/EditorOutlet';
import { ArticleOutlet } from './outlets/ArticleOutlet';
import { SettingsOutlet } from './outlets/SettingsOutlet';

export class App extends WidgetBase {
	protected render() {
		return v('div', [
			w(HeaderContainer, {}),
			w(LoginOutlet, {}),
			w(RegisterOutlet, {}),
			w(UserProfileOutlet, {}),
			w(FavProfileOutlet, {}),
			w(EditorEditOutlet, {}),
			w(EditorNewOutlet, {}),
			w(ArticleOutlet, {}),
			w(SettingsOutlet, {}),
			w(HomeOutlet, {})
		]);
	}
}

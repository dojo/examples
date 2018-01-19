import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { w } from '@dojo/widget-core/d';

import { HeaderContainer } from './containers/HeaderContainer';
import { HomeOutlet } from './outlets/HomeOutlet';
import { LoginOutlet } from './outlets/LoginOutlet';
import { ProfileOutlet } from './outlets/ProfileOutlet';
import { RegisterOutlet } from './outlets/RegisterOutlet';
import { EditorEditOutlet, EditorNewOutlet } from './outlets/EditorOutlet';
import { ArticleOutlet } from './outlets/ArticleOutlet';
import { SettingsOutlet } from './outlets/SettingsOutlet';

export class App extends WidgetBase {
	protected render() {
		return [
			w(HeaderContainer, {}),
			w(LoginOutlet, {}),
			w(RegisterOutlet, {}),
			w(ProfileOutlet, {}),
			w(EditorEditOutlet, {}),
			w(EditorNewOutlet, {}),
			w(ArticleOutlet, {}),
			w(SettingsOutlet, {}),
			w(HomeOutlet, {})
		];
	}
}

import Container from '@dojo/widget-core/Container';
import Injector from '@dojo/widget-core/Injector';
import { switchLocale } from '@dojo/i18n/i18n';

import ThemeSwitcher from './../widgets/ThemeSwitcher';
import pirateThemeStyles from './../themes/pirate';

function getProperties(themeContext: Injector) {
	return {
		changeTheme(wantsPirate: boolean) {
			if (wantsPirate) {
				switchLocale('en-PR');
				/*themeContext.set(pirateThemeStyles);*/
			}
			else {
				switchLocale('en');
				/*themeContext.set(undefined);*/
			}
		}
	};
}

export default Container(ThemeSwitcher, 'theme-context', { getProperties });

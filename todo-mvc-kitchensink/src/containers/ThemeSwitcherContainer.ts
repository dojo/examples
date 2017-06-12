import { Container } from '@dojo/widget-core/Container';
import { switchLocale } from '@dojo/i18n/i18n';
import { registerThemeInjector } from '@dojo/widget-core/mixins/Themeable';

import { TodoAppContext } from './../TodoAppContext';
import { ThemeSwitcher } from './../widgets/ThemeSwitcher';
import pirateThemeStyles from './../themes/pirate';

const themeContext = registerThemeInjector(undefined);

function changeTheme(wantsPirate: boolean) {
	if (wantsPirate) {
		switchLocale('en-PR');
		themeContext.set(pirateThemeStyles);
	}
	else {
		switchLocale('en');
		themeContext.set(undefined);
	}
}

function getProperties(todoAppContext: TodoAppContext, properties: any) {
	return {
		changeTheme
	};
}

export const ThemeSwitcherContainer = Container(ThemeSwitcher, 'state', { getProperties });

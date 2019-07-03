import { tsx, create } from '@dojo/framework/core/vdom';
import { theme } from '@dojo/framework/core/middleware/theme';
import { i18n } from '@dojo/framework/core/middleware/i18n';

import bundle from '../nls/common';
import * as css from './styles/themeSwitcher.m.css';
import pirateThemeStyles from './../themes/pirate';

const factory = create({ theme, i18n });

export default factory(function ThemeSwitcher({ middleware: { theme, i18n } }) {
	const { themeSwitcher, themeSwitcherCheckbox } = theme.classes(css);
	const { themeSwitchTitle } = i18n.localize(bundle).messages;
	function switcher(event: MouseEvent) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			i18n.set({ locale: 'en-PR' });
			theme.set(pirateThemeStyles);
		} else {
			i18n.set({});
			theme.set({});
		}
	}
	return (
		<label classes={[themeSwitcher]}>
			<span>{themeSwitchTitle}</span>
			<input classes={[themeSwitcherCheckbox]} type="checkbox" onclick={switcher} />
		</label>
	);
});

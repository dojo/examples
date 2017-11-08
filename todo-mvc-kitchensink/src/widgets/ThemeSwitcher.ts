import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/themeSwitcher.m.css';

interface ThemeSwitcherProperties extends WidgetProperties {
	changeTheme: (wantsPirate: boolean) => void;
}

const ThemeSwitherBase = I18nMixin(ThemedMixin(WidgetBase));

@theme(css)
export class ThemeSwitcher extends ThemeSwitherBase<ThemeSwitcherProperties> {
	onClick(event: MouseEvent): void {
		this.properties.changeTheme((<HTMLInputElement> event.target!).checked);
	}

	protected render(): DNode {
		const messages = this.localizeBundle(appBundle);

		return v('label', {
			classes: this.theme(css.themeSwitcher)
		}, [
			v('span', [ messages.themeSwitchTitle ]),
			v('input', {
				type: 'checkbox',
				onclick: this.onClick,
				classes: this.theme(css.themeSwitcherCheckbox)
			})
		]);
	}
}

export default ThemeSwitcher;

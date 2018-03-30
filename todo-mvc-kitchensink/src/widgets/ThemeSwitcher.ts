import WidgetBase from '@dojo/widget-core/WidgetBase';
import I18nMixin from '@dojo/widget-core/mixins/I18n';
import { v } from '@dojo/widget-core/d';
import ThemedMixin, { theme } from '@dojo/widget-core/mixins/Themed';

import appBundle from '../nls/common';
import * as css from './styles/themeSwitcher.m.css';

interface ThemeSwitcherProperties {
	changeTheme: (wantsPirate: boolean) => void;
}

@theme(css)
export default class ThemeSwitcher extends I18nMixin(ThemedMixin(WidgetBase))<ThemeSwitcherProperties> {

	private _onClick(event: MouseEvent) {
		const target = event.target as HTMLInputElement;
		this.properties.changeTheme(target.checked);
	}

	protected render() {
		const { messages } = this.localizeBundle(appBundle);

		return v('label', {
			classes: this.theme(css.themeSwitcher)
		}, [
			v('span', [ messages.themeSwitchTitle ]),
			v('input', {
				type: 'checkbox',
				onclick: this._onClick,
				classes: this.theme(css.themeSwitcherCheckbox)
			})
		]);
	}
}

import { v } from '@dojo/widget-core/d';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import * as styles from './styles/ThemeSwitcher.m.css';
import appBundle from '../nls/common';

interface ThemeSwitcherProperties extends WidgetProperties, ThemeableProperties, I18nProperties {
	wantsPirate?: boolean;
	onChange?: (wantsPirate: boolean) => void;
}

@theme(styles)
export class ThemeSwitcher extends I18nMixin(ThemeableMixin(WidgetBase))<ThemeSwitcherProperties> {
	onClick(event: MouseEvent) {
		this.properties.onChange && this.properties.onChange((<HTMLInputElement> event.target!).checked);
	}

	render() {
		const { wantsPirate = false } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return v('label', {
			classes: this.classes(styles.themeSwitcher)
		}, [
			v('span', { innerHTML: messages.themeSwitchTitle }),
			v('input', {
				type: 'checkbox',
				checked: wantsPirate,
				onclick: this.onClick,
				classes: this.classes(styles.themeSwitcherCheckbox)
			})
		]);
	}
}

export default ThemeSwitcher;

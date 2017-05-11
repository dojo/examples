import { v } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { ThemeableMixin, ThemeableProperties, theme } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import appBundle from '../nls/common';
import * as styles from './styles/AppFooter.m.css';

export interface AppFooterProperties extends ThemeableProperties, I18nProperties {
}

@theme(styles)
export class AppFooter extends I18nMixin(ThemeableMixin(WidgetBase))<AppFooterProperties> {
	render() {
		const messages = this.localizeBundle(appBundle);

		return v('div', [
			v('footer', {
				classes: this.classes(styles.footer)
			}, [
				v('p', {
					id: 'edit-instructions',
					innerHTML: messages.footerInstructions
				}),
				v('p', {
					innerHTML: messages.footerCredits
				}),
				v('p', {
					innerHTML: messages.footerPartOf
				})
			])
		]);
	}
}

export default AppFooter;

import { v } from '@dojo/widget-core/d';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { SharedWidgetProperties } from '../App';
import * as styles from './styles/AppFooter.css';
import appBundle from '../nls/common';

export interface AppFooterProperties extends SharedWidgetProperties {
}

@theme(styles)
export class AppFooter extends I18nMixin(ThemeableMixin(WidgetBase))<AppFooterProperties> {
	render() {
		const messages = this.localizeBundle(appBundle);

		return v('footer', {
			classes: this.classes(styles.footer).get()
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
		]);
	}
}

export default AppFooter;

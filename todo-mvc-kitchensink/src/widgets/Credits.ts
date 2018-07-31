import { v } from '@dojo/framework/widget-core/d';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';
import ThemedMixin, { theme } from '@dojo/framework/widget-core/mixins/Themed';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import appBundle from '../nls/common';
import * as css from './styles/credits.m.css';

@theme(css)
export default class Credits extends I18nMixin(ThemedMixin(WidgetBase)) {
	protected render() {
		const { messages } = this.localizeBundle(appBundle);

		return [
			v('footer', {
				classes: this.theme(css.footer)
			}, [
				v('p', [ messages.footerInstructions ]),
				v('p', [ messages.footerCredits ]),
				v('p', [ messages.footerPartOf ])
			])
		];
	}
}

import { v } from '@dojo/widget-core/d';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import appBundle from '../nls/common';
import * as css from './styles/credits.m.css';

const CreditsBase = I18nMixin(ThemedMixin(WidgetBase));

@theme(css)
export class Credits extends CreditsBase<WidgetProperties> {
	protected render(): DNode[] {
		const messages = this.localizeBundle(appBundle);

		return [
			v('footer', {
				classes: this.theme(css.footer)
			}, [
				v('p', { innerHTML: messages.footerInstructions }),
				v('p', { innerHTML: messages.footerCredits }),
				v('p', { innerHTML: messages.footerPartOf })
			])
		];
	}
}

export default Credits;

import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import ThemedMixin, { theme } from '@dojo/widget-core/mixins/Themed';
import I18nMixin from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoSearch.m.css';

export interface TodoSearchProperties {
	search: (payload: { search: string }) => void;
	searchValue: string;
}

@theme(css)
export default class TodoSearch extends I18nMixin(ThemedMixin(WidgetBase))<TodoSearchProperties> {

	protected onInput({ target: { value: search } }: any) {
		this.properties.search({ search });
	}

	protected render() {
		const { searchValue: value } = this.properties;
		const { messages } = this.localizeBundle(appBundle);

		return [
			v('span', { classes: this.theme(css.searchIcon) }),
			v('input', {
				type: 'text',
				classes: this.theme(css.search),
				placeholder: messages.searchPlaceholder,
				value,
				oninput: this.onInput
			})
		];
	}
}

import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { DNode, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { I18nMixin } from '@dojo/widget-core/mixins/I18n';

import appBundle from '../nls/common';
import * as css from './styles/todoSearch.m.css';

export interface TodoSearchProperties {
	searchInput: (id: string) => void;
	searchValue: string;
}

export const TodoSearchBase = I18nMixin(ThemeableMixin(WidgetBase));

@theme(css)
export class TodoSearch extends TodoSearchBase<TodoSearchProperties> {

	protected onInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.searchInput(value);
	}

	protected render(): DNode[] {
		const { searchValue: value } = this.properties;
		const messages = this.localizeBundle(appBundle);

		return [
			v('span', { classes: this.classes(css.searchIcon) }),
			v('input', {
				type: 'text',
				classes: this.classes(css.search),
				placeholder: messages.searchPlaceholder,
				value,
				oninput: this.onInput
			})
		];
	}
}

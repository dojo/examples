import { v } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { DNode, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './styles/todoSearch.m.css';

export interface TodoSearchProperties {
	searchInput: (id: string) => void;
	searchValue: string;
}

export const TodoSearchBase = ThemeableMixin(WidgetBase);

@theme(css)
export class TodoSearch extends TodoSearchBase<TodoSearchProperties> {

	protected onInput({ target: { value } }: TypedTargetEvent<HTMLInputElement>) {
		this.properties.searchInput(value);
	}

	protected render(): DNode {
		const { searchValue: value } = this.properties;

		return v('input', {
			type: 'text',
			classes: this.classes(css.search),
			placeholder: 'Quick Filter',
			value,
			oninput: this.onInput
		});
	}
}

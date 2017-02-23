import { v, w } from '@dojo/widget-core/d';
import { I18nMixin, I18nProperties } from '@dojo/widget-core/mixins/I18n';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoToggleAll, updateSearch } from '../actions/userActions';
import { Item } from '../App';
import appBundle from '../nls/common';
import CheckboxInput from './CheckboxInput';
import SearchInput from './SearchInput';
import * as styles from './styles/MainSection.css';
import TodoItemList from './TodoItemList';

interface MainSectionProperties extends ThemeableProperties, I18nProperties {
	allCompleted?: boolean;
	todos?: Item[];
	activeView?: string;
	search?: string;
}

@theme(styles)
export default class MainSection extends I18nMixin(ThemeableMixin(WidgetBase))<MainSectionProperties> {
	searchHandler(event: any) {
		updateSearch(event.target.value);
	}

	render() {
		const messages = this.localizeBundle(appBundle);

		const { todos = [], allCompleted = false, activeView = 'list', search = '', theme } = this.properties;
		const checkBoxOptions = {
			checked: allCompleted,
			onChange: todoToggleAll,
			theme
		};

		return v('section', {
			classes: this.classes(styles.main)
		}, [
			w(CheckboxInput, checkBoxOptions),
			todos.length ? v('div', {
				classes: this.classes(styles.searchBar)
			}, [
				v('span', {
					classes: this.classes(styles.searchIcon)
				}), w(SearchInput, {
					placeholder: messages.searchPlaceholder,
					value: search,
					onKeyUp: this.searchHandler,
					theme
				})
			]) : null,
			w(TodoItemList, <any> { ...this.properties, key: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}` })
		]);
	}
}

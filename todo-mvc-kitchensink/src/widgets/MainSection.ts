import { v, w } from '@dojo/widget-core/d';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoToggleAll, updateSearch } from '../actions/userActions';
import { Item } from '../App';
import CheckboxInput from './CheckboxInput';
import SearchInput from './SearchInput';
import * as styles from './styles/mainsection.css';
import TodoItemList from './TodoItemList';

interface MainSectionProperties {
	allCompleted?: boolean;
	todos?: Item[];
	activeView?: string;
	search?: string;
}

@theme(styles)
export default class MainSection extends ThemeableMixin(WidgetBase)<MainSectionProperties> {
	searchHandler(event: any) {
		updateSearch(event.target.value);
	}

	render() {
		const { todos = [], allCompleted = false, activeView = 'list', search = '' } = this.properties;
		const checkBoxOptions = {
			checked: allCompleted,
			overrideClasses: { checkbox: styles.toggleAll },
			onChange: todoToggleAll
		};

		return v('section', {
			classes: this.classes(styles.main).get()
		}, [
			w(CheckboxInput, checkBoxOptions),
			todos.length ? v('div', {
				classes: this.classes(styles.searchBar).get()
			}, [
				v('span', {
					classes: this.classes(styles.searchIcon).get()
				}), w(SearchInput, {
					placeholder: 'Quick Filter',
					value: search,
					onKeyUp: this.searchHandler
				})
			]) : null,
			w(TodoItemList, <any> { ...this.properties, key: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}` })
		]);
	}
}

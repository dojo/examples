import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { todoToggleAll, updateSearch } from '../actions/userActions';
import { Item } from '../App';
import CheckboxInput from './CheckboxInput';
import SearchInput from './SearchInput';
import TodoItemList from './TodoItemList';

interface MainSectionProperties {
	allCompleted?: boolean;
	todos?: Item[];
	activeView?: string;
	search?: string;
}

export default class MainSection extends WidgetBase<MainSectionProperties> {
	searchHandler(event: any) {
		updateSearch(event.target.value);
	}

	render() {
		const { todos = [], allCompleted = false, activeView = 'list', search = '' } = this.properties;
		const checkBoxOptions = {
			checked: allCompleted,
			className: 'toggle-all',
			onChange: todoToggleAll
		};

		return v('section', {
			classes: {
				main: true
			}
		}, [
			w(CheckboxInput, checkBoxOptions),
			todos.length ? v('div.searchbar', {}, [
					v('span.icon', {}), w(SearchInput, {
						placeholder: 'Quick Filter',
						value: search,
						onKeyUp: this.searchHandler
					})
				]) : null,
			w(TodoItemList, <any> { ...this.properties, key: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}` })
		]);
	}
}

import { DNode, Widget, WidgetProperties } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { w, v } from '@dojo/widgets/d';

import { todoToggleAll, updateSearch } from '../actions/userActions';
import createCheckboxInput from './createCheckboxInput';
import createTodoItemList from './createTodoItemList';
import createSearchInput from './createSearchInput';
import { CheckboxInputProperties } from './createCheckboxInput';

interface MainSectionProperties {
	allCompleted: boolean;
}

function searchHandler(event: any) {
	updateSearch(event.target.value);
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainSectionProperties>): DNode[] {
			const { properties } = <any> this;
			const { todos = [] } = properties;
			const checkBoxOptions: CheckboxInputProperties = {
				id: 'todo-toggle',
				checked: properties.allCompleted,
				classes: [ 'toggle-all' ],
				listeners: {
					change: todoToggleAll
				}
			};

			const { activeView } = properties;

			return <DNode[]> [
				w(createCheckboxInput, checkBoxOptions),
				todos.length ? v('div.searchbar', {}, [
						v('span.icon', {}), w(createSearchInput, {
							properties: {
								placeholder: 'Quick Filter',
								value: properties.search
							},
							listeners: {
								input: searchHandler
							}
						})
					]) : null,
				w(createTodoItemList, <WidgetProperties> {
					id: `todo-item-${activeView === 'cards' ? 'cards' : 'list'}`,
					properties: properties
				})
			];
		}
	}
});

export default createMainSection;

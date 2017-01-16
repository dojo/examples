import { DNode, Widget, WidgetProperties } from '@dojo/widgets/interfaces';
import createWidgetBase from '@dojo/widgets/createWidgetBase';
import { w } from '@dojo/widgets/d';
import { todoToggleAll } from '../actions/userActions';
import createCheckboxInput, { CheckboxProperties } from './createCheckboxInput';
import createTodoList, { TodoListProperties } from './createTodoList';

export interface MainSectionProperties extends WidgetProperties, TodoListProperties {
	allCompleted: boolean;
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainSectionProperties>): DNode[] {
			const { properties: { todos, allCompleted: checked, activeFilter } } = this;
			const checkBoxProperties: CheckboxProperties = {
				id: 'todo-toggle',
				checked,
				classes: [ 'toggle-all' ],
				onChange: todoToggleAll
			};

			return [
				w(createCheckboxInput, checkBoxProperties),
				w(createTodoList, { todos, activeFilter })
			];
		}
	}
});

export default createMainSection;

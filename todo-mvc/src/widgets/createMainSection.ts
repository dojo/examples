import { DNode, Widget, WidgetProperties } from '@dojo/widget-core/interfaces';
import createWidgetBase from '@dojo/widget-core/createWidgetBase';
import { w } from '@dojo/widget-core/d';
import { todoToggleAll } from '../actions/userActions';

export interface MainSectionProperties extends WidgetProperties {
	allCompleted: boolean;
	store: any;
}

const createMainSection = createWidgetBase.mixin({
	mixin: {
		tagName: 'section',
		classes: [ 'main' ],
		getChildrenNodes: function (this: Widget<MainSectionProperties>): DNode[] {
			const { properties: { activeFilter, todos, allCompleted: checked } } = this;

			return [
				w('checkbox', { checked, onChange: todoToggleAll, classes: [ 'toggle-all' ]}),
				w('todo-list', { todos, activeFilter })
			];
		}
	}
});

export default createMainSection;

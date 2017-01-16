import { DNode, Widget } from '@dojo/widgets/interfaces';
import createProjector from '@dojo/widgets/createProjector';
import externalState from '@dojo/widgets/mixins/externalState';
import { w } from '@dojo/widgets/d';
import createTodoDetails from './widgets/createTodoDetails';
import FactoryRegistry from '@dojo/widgets/FactoryRegistry';
import createHome from './widgets/createHome';

const widgetRegistry = new FactoryRegistry();

interface AppProperties {
	widgets: any;
}

widgetRegistry.define('main', createHome);
widgetRegistry.define('todo-details', createTodoDetails);

const createApp = createProjector
	.mixin({
		mixin: {
			registry: widgetRegistry,
			getChildrenNodes: function (this: Widget<AppProperties>): DNode[] {
				const { widgets = [ [ 'main', {} ] ] } = this.properties;

				return widgets.map((widget: any) => {
					return w(<any> widget[ 0 ], <any> { ...this.properties, ...widget[ 1 ] });
				});
			},
			classes: [ 'todoapp' ],
			tagName: 'section'
		}
	})
	.mixin(externalState);

export default createApp;

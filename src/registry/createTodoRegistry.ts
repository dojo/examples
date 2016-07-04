import Promise from 'dojo-core/Promise';
import { Child } from 'dojo-widgets/mixins/interfaces';
import createTodoItem from '../widgets/createTodoItem';
import WeakMap from 'dojo-core/WeakMap';
import Map from 'dojo-core/Map';
import compose from 'dojo-compose/compose';
import { MemoryStore } from 'dojo-widgets/util/createMemoryStore';

const idToWidgetMap = new Map<string, Child>();
const widgetToIdMap = new WeakMap<Child, string>();

interface TodoRegistryOptions {
	widgetStore: MemoryStore<Object>;
}

const todoRegistryFactory = compose({
	get(id: string): Promise<Child> {
		let widget: Child = idToWidgetMap.get(id);
		if (!widget) {
			widget = createTodoItem({id, stateFrom: this.widgetStore});
			widgetToIdMap.set(widget, id);
			idToWidgetMap.set(id, widget);
		}
		return Promise.resolve(widget);
	},
	identify(value: Child): string {
		return widgetToIdMap.get(value);
	}
}, function (todoRegistry: any, options: any) {
	if (options) {
		for (let key in options) {
			todoRegistry[key] = options[key];
		}
	}
});

export default todoRegistryFactory;

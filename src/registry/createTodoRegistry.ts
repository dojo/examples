import Promise from 'dojo-core/Promise';
import createTodoItem, { TodoItem } from '../widgets/createTodoItem';
import WeakMap from 'dojo-core/WeakMap';
import Map from 'dojo-core/Map';
import compose from 'dojo-compose/compose';
import { MemoryStore } from 'dojo-widgets/util/createMemoryStore';

const idToWidgetMap = new Map<string, TodoItem>();
const widgetToIdMap = new WeakMap<TodoItem, string>();

interface TodoRegistryOptions {
	[key: string]: MemoryStore<Object>;
}

interface TodoRegistry {
	get(id: string): Promise<TodoItem>;
	identify(value: TodoItem): string;
	widgetStore?: MemoryStore<Object>;
	[key: string]: any;
}

const todoRegistryFactory = compose({
	get(id: string): Promise<TodoItem> {
		let widget: TodoItem = idToWidgetMap.get(id);
		if (!widget) {
			widget = createTodoItem({id, stateFrom: this.widgetStore});
			widgetToIdMap.set(widget, id);
			idToWidgetMap.set(id, widget);
		}
		return Promise.resolve(widget);
	},
	identify(value: TodoItem): string {
		return widgetToIdMap.get(value);
	}
}, function (todoRegistry: TodoRegistry, options: any) {
	if (options) {
		for (let key in options) {
			todoRegistry[key] = options[key];
		}
	}
});

export default todoRegistryFactory;

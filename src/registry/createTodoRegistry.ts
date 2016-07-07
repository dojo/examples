import Promise from 'dojo-shim/Promise';
import createTodoItem, { TodoItem } from '../widgets/createTodoItem';
import WeakMap from 'dojo-shim/WeakMap';
import Map from 'dojo-shim/Map';
import compose from 'dojo-compose/compose';
import { MemoryStore } from '../utils/createLocalMemoryStore';

const idToWidgetMap = new Map<string, TodoItem>();
const widgetToIdMap = new WeakMap<TodoItem, string>();

interface TodoRegistryOptions {
	widgetStore: MemoryStore<Object>;
}

interface TodoRegistry {
	get(id: string): Promise<TodoItem>;
	identify(value: TodoItem): string;
	widgetStore?: MemoryStore<Object>;
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
}, function (todoRegistry: TodoRegistry, options: TodoRegistryOptions) {
	if (options) {
		todoRegistry.widgetStore = options.widgetStore;
	}
});

export default todoRegistryFactory;

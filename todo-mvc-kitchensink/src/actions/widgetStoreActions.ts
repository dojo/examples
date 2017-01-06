import { StoreDelta } from 'dojo-stores/store/mixins/createObservableStoreMixin';
import widgetStore from '../stores/widgetStore';
import todoStore from '../stores/todoStore';
import { Item } from '../stores/todoStore';

export const putTodo = function({ afterAll = [] }: StoreDelta<any>) {
	const completedCount = afterAll.filter(({ completed }) => completed).length;
	const activeCount = afterAll.length - completedCount;
	const allCompleted = afterAll.length === completedCount;

	return widgetStore.patch({ id: 'todo-app', todos: afterAll, activeCount, completedCount, allCompleted });
};

export const setHierarchy = function (this: any, widgets: [ string, any ][]) {
	widgetStore.patch({ id: 'todo-app', widgets });
};

export const filterAndView = function (this: any, filter: 'active' | 'all' | 'completed', view: 'list' | 'cards') {
	const { state: { activeView = view, activeFilter = filter } = { } } = this;
	widgetStore.patch({ id: 'todo-app', activeView, activeFilter });
};

export const showTodoDetails = function(todoId: string) {
	return todoStore.get(todoId).then(( todo: Item) => {
		widgetStore.patch({ id: 'todo-details', todoDetails: todo }).then(() => {
			setHierarchy([ [ 'main', {} ], [ 'todo-details', { id: 'todo-details', stateFrom: widgetStore } ] ]);
		});
	});
};

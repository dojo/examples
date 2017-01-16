import { StoreDelta } from '@dojo/stores/store/mixins/createObservableStoreMixin';
import widgetStore from '../stores/widgetStore';

export const putTodo = function({ afterAll = [] }: StoreDelta<any>) {
	const completedCount = afterAll.filter(({ completed }) => completed).length;
	const activeCount = afterAll.length - completedCount;
	const allCompleted = afterAll.length === completedCount && afterAll.length;

	return widgetStore.patch({ id: 'todo-app', todos: afterAll, activeCount, completedCount, allCompleted });
};

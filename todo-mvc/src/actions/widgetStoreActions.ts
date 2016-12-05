import createAction from 'dojo-actions/createAction';

import { StoreDelta } from 'dojo-stores/store/mixins/createObservableStoreMixin';
import widgetStore from '../stores/widgetStore';

export const putTodo = createAction({
	do({ afterAll = [] }: StoreDelta<any>) {
		const completedCount = afterAll.filter(({ completed }) => completed).length;
		const activeCount = afterAll.length - completedCount;
		const allCompleted = afterAll.length === completedCount;

		return widgetStore.patch({ id: 'todo-app', todos: afterAll, activeCount, completedCount, allCompleted });
	}
});

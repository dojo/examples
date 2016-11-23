import createAction from 'dojo-actions/createAction';

import { StoreDelta } from 'dojo-stores/store/mixins/createObservableStoreMixin';
import widgetStore from '../stores/widgetStore';

export const updateHeaderAndFooter = createAction({
	do({ afterAll = [] }: StoreDelta<any>) {
		const completedCount = afterAll.filter(({ completed }) => completed).length;
		const activeCount = afterAll.length - completedCount;
		const hidden = afterAll.length ? [] : ['hidden'];
		const allCompleted = afterAll.length === completedCount;

		return widgetStore.patch([{
			id: 'todo-footer',
			completedCount,
			activeCount,
			classes: ['footer', ...hidden]
		}, {
			id: 'todo-toggle',
			checked: allCompleted,
			classes: ['toggle-all', ...hidden]
		}]);

	}
});

export const putTodo = createAction({
	do({ afterAll = [] }: StoreDelta<any>) {
		return widgetStore.patch({ id: 'todo-list', todos: afterAll });
	}
});

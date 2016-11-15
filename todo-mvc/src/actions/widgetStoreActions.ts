import createAction from 'dojo-actions/createAction';

import { ChangeRecord } from '../stores/todoStore';
import widgetStore from '../stores/widgetStore';

export const updateHeaderAndFooter = createAction({
	do({ afterAll }: ChangeRecord) {
		const completedCount = afterAll.filter(({ completed }) => completed).length;
		const activeCount = afterAll.length - completedCount;
		const hidden = afterAll.length ? [] : ['hidden'];
		const allCompleted = afterAll.length === completedCount;

		return Promise.all([
			widgetStore.patch({
				id: 'todo-footer',
				completedCount,
				activeCount,
				classes: ['footer', ...hidden]
			}),

			widgetStore.patch({
				id: 'todo-toggle',
				checked: allCompleted,
				classes: ['toggle-all', ...hidden]
			})
		]);
	}
});

export const putTodo = createAction({
	do({ afterAll }: ChangeRecord) {
		return widgetStore.patch({ id: 'todo-list', todos: afterAll });
	}
});

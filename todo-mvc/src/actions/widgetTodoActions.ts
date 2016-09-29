import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';
import { includes } from 'dojo-shim/array';

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

export const deleteTodo = createAction({
	do({ afterAll, deletes }: ChangeRecord) {
		if (deletes.length) {
			const [ deletedId ] = deletes;
			const children = afterAll
				.filter(({ id }) => id !== deletedId)
				.map(({ id }) => id);

			return widgetStore
				.delete(deletedId)
				.patch({ id: 'todo-list', children });
		}
	}
});

export const putTodo = createAction({
	do({ beforeAll, puts }: ChangeRecord) {
		if (puts.length) {
			const [ item ] = puts;
			const children = beforeAll.map(({ id }) => id);

			if (includes(children, item.id)) {
				return widgetStore
					.patch(item)
					.patch({ id: 'todo-list', children });
			}

			return widgetStore
				.put(assign({}, <any> item, { type: 'todo-item' }))
				.patch({id: 'todo-list', children: [...children, item.id]});
		}
	}
});

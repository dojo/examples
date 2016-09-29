import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';
import { includes } from 'dojo-shim/array';

import { ChangeRecord } from '../stores/todoStore';
import widgetStore from '../stores/widgetStore';

export const updateHeaderAndFooter = createAction({
	do(options: ChangeRecord) {
		const { afterAll } = options;
		const completedCount = afterAll.filter(({ completed }) => completed).length;
		const activeCount = afterAll.filter(({ completed }) => !completed).length;
		const hidden = afterAll.length ? [] : ['hidden'];
		const allCompleted = afterAll.length === completedCount;

		widgetStore.patch({
			id: 'todo-footer',
			completedCount,
			activeCount,
			classes: ['footer', ...hidden]
		});

		widgetStore.patch({
			id: 'todo-toggle',
			checked: allCompleted,
			classes: ['toggle-all', ...hidden]
		});
	}
});

export const afterTodoDelete = createAction({
	do(options: ChangeRecord) {
		const { deletes, afterAll } = options;
		if (deletes.length) {
			const deletedId = deletes[0];
			const children = afterAll
				.filter(({ id }) => id !== deletedId)
				.map(({ id }) => id);
			return widgetStore.delete(deletedId).patch({ id: 'todo-list', children });
		}
	}
});

export const afterTodoPut = createAction({
	do(options: ChangeRecord) {
		const { puts, beforeAll } = options;
		if (puts.length) {
			const item = puts[0];
			const children = beforeAll.map(({ id }) => id);

			const put = function() {
				return widgetStore
				.put(assign({}, <any> item, { type: 'todo-item' }))
				.patch({id: 'todo-list', children: [...children, item.id]});
			};

			const patch = function() {
				return widgetStore
				.patch(item)
				.patch({id: 'todo-list', children});
			};

			return includes(children, item.id) ? patch() : put();
		}
	}
});

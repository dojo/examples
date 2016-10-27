import createAction from 'dojo-actions/createAction';
import { assign } from 'dojo-core/lang';
import { includes } from 'dojo-shim/array';

import widgetStore from '../stores/widgetStore';
import { Item } from '../stores/todoStore';
import { StoreDelta } from 'dojo-stores/store/mixins/createObservableStoreMixin';

export const updateHeaderAndFooter = createAction({
	do({ afterAll }: StoreDelta<Item>) {
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
		}]).then();
	}
});

export const deleteTodo = createAction({
	do({ afterAll, deletes }: StoreDelta<Item>) {
		if (deletes.length) {
			const [ deletedId ] = deletes;
			const children = afterAll
				.filter(({ id }) => id !== deletedId)
				.map(({ id }) => id);

			return widgetStore
				.delete(deletedId)
				.then(() => {
					return widgetStore.patch({ id: 'todo-list', children });
				});
		}
	}
});

export const putTodo = createAction({
	do({ beforeAll, adds, updates }: StoreDelta<Item>) {
		if (adds.length || updates.length) {
			const [ item ] = adds;
			const [ update ] = updates;
			const children = beforeAll.map(({ id }) => id);

			let promise: Promise<any> = Promise.resolve();
			if (includes(children, update && update.id)) {
				promise = widgetStore.patch([ ...updates.filter((update) => {
					return includes(children, update && update.id);
				}), { id: 'todo-list', children } ]);
			}
			if (item) {
				promise = promise.then(() =>
					widgetStore
						.put(assign({}, <any> item, { type: 'todo-item' }))
						.then(() => {
							return widgetStore.patch({id: 'todo-list', children: [...children, item.id]});
						})
				);
			}
			return promise;
		}
	}
});

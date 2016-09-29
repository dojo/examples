import { App } from 'dojo-app/createApp';
import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';

export interface Item {
	id: string;
	label: string;
	completed?: boolean;
}

export type Store = MemoryStore<Item>;

// FIXME: The ChangeRecord from createMemoryStore should define these properties.
export interface ChangeRecord {
	beforeAll: Item[];
	afterAll: Item[];
	deletes: string[];
	puts: Item[];
}

const todoStore: Store = createMemoryStore<Item>({
	data: []
});

export default todoStore;

// FIXME: Would be great if the app could trigger a callback like this, passing the registry provider.
export function bindActions(app: App) {
	return Promise.all([
		app.getAction('updateHeaderAndFooter'),
		app.getAction('afterTodoDelete'),
		app.getAction('afterTodoPut')
	])
	.then(([ updateHeaderAndFooter, afterTodoDelete, afterTodoPut ]) => {
		return todoStore
			.observe()
			.subscribe((options: any) => {
				const changeRecord = <ChangeRecord> options;
				updateHeaderAndFooter.do(changeRecord);

				const { puts, deletes } = changeRecord;
				if (deletes.length) {
					afterTodoDelete.do(changeRecord);
				}
				if (puts.length) {
					afterTodoPut.do(changeRecord);
				}
			});
	});
}

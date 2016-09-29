import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';

import { updateHeaderAndFooter, afterTodoDelete, afterTodoPut } from '../actions/widgetTodoActions';

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

// FIXME: Would be great if the app could trigger a callback like this.
export function bindActions() {
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
}

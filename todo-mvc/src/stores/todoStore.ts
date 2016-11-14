import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';

import { updateHeaderAndFooter, putTodo } from '../actions/widgetStoreActions';

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
			putTodo.do(changeRecord);
		});
}

import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';
import { putCard } from './../actions/widgetStoreActions';

export interface Card {
	id: string;
	name: string;
	tagline: string;
	description: string;
	cardImage: string;
	favouriteCount: number;
}

export type Store = MemoryStore<Card>;

const cardStore: Store = createMemoryStore<Card>({
	data: []
});

export interface ChangeRecord {
	beforeAll: Card[];
	afterAll: Card[];
	deletes: string[];
	puts: Card[];
}

export function bindActions() {
	return cardStore.observe().subscribe((options: any) => {
			const changeRecord = <ChangeRecord> options;

			return putCard.do(changeRecord);
	});
}

export default cardStore;

import createMemoryStore, { MemoryStore } from 'dojo-stores/createMemoryStore';
import { favCard } from './../actions/widgetStoreActions';

export interface Card {
	id: string;
	cardType: 'momentum' | 'mayhem';
	name: string;
	tagline: string;
	description: string;
	score: number;
	cardImage: string;
	favouriteCount: number;
}

export type Store = MemoryStore<Card>;

const favCardStore: Store = createMemoryStore<Card>({
	data: [
	]
});

export interface ChangeRecord {
	beforeAll: Card[];
	afterAll: Card[];
	deletes: string[];
	puts: Card[];
}

export function bindActions() {
	return favCardStore.observe().subscribe((options: any) => {
			const changeRecord = <ChangeRecord> options;

			return favCard.do(changeRecord);
	});
}

export default favCardStore;

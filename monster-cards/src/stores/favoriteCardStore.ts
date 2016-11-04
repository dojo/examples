import createMemoryStore from 'dojo-stores/createMemoryStore';
import { Card, ChangeRecord, Store } from './cardStore';
import { transformFavoriteCardToWidgets } from './../actions/widgetStoreActions';

const favCardStore: Store = createMemoryStore<Card>({
	data: []
});

export function bindActions() {
	return favCardStore.observe().subscribe((options: any) => {
			return transformFavoriteCardToWidgets.do(<ChangeRecord> options);
	});
}

export default favCardStore;

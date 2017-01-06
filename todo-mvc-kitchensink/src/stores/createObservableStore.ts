import createStore, { CrudOptions, UpdateResults } from 'dojo-stores/store/createStore';
import createObservableStoreMixin, {
	ObservableStore, ObservableStoreOptions
} from 'dojo-stores/store/mixins/createObservableStoreMixin';

export type Store<T> = ObservableStore<T, CrudOptions, UpdateResults<T>>;

export type StoreFactory = <T, O extends CrudOptions, U extends UpdateResults<T>>(options?: ObservableStoreOptions<T, O>) => ObservableStore<T, O, U>;

const createObservableStore: StoreFactory = createStore.mixin(createObservableStoreMixin());

export default createObservableStore;

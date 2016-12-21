import { createObservableStore } from 'dojo-stores/store/mixins/createObservableStoreMixin';

export default createObservableStore({
	data: [
		{
			id: 'todo-app',
			todo: '',
			todos: [],
			completedCount: 0,
			activeCount: 0,
			activeFilter: 'all',
			allCompleted: false
		}
	]
});

import { App } from 'dojo-app/createApp';
import createMemoryStore from 'dojo-stores/createMemoryStore';

const todoStore = createMemoryStore({
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
			// FIXME: options should be typed
			.subscribe((options: any) => {
				updateHeaderAndFooter.do(options);

				const { puts, deletes } = options;
				if (deletes.length) {
					afterTodoDelete.do(options);
				}
				if (puts.length) {
					afterTodoPut.do(options);
				}
			});
	});
}

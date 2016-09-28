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
		app.getAction('deleteTodo'),
		app.getAction('putTodo')
	])
	.then(([ updateHeaderAndFooter, deleteTodo, putTodo ]) => {
		return todoStore
			.observe()
			// FIXME: options should be typed
			.subscribe((options: any) => {
				updateHeaderAndFooter.do(options);

				const { puts, deletes } = options;
				if (deletes.length) {
					deleteTodo.do(options);
				}
				if (puts.length) {
					putTodo.do(options);
				}
			});
	});
}

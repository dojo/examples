import createMemoryStore from 'dojo-stores/createMemoryStore';

export default createMemoryStore({
	data: [
		{
			id: 'title',
			label: 'todos'
		},
		{
			id: 'new-todo',
			classes: ['new-todo'],
			focused: true,
			placeholder: 'What needs to be done?'
		},
		{
			id: 'main-section',
			classes: ['main']
		},
		{
			id: 'todo-list',
			classes: ['todo-list'],
			children: []
		},
		{
			id: 'todo-toggle',
			classes: ['toggle-all'],
			checked: false
		},
		{
			id: 'todo-footer',
			classes: ['footer'],
			completedCount: 0,
			activeCount: 0,
			activeFilter: 'all'
		}
	]
});

const bundlePath = 'nls/main';
const locales: string[] = [ 'en-PA' ];
const messages = {
	active: 'Active',
	all: 'All',
	clearCompleted: 'Clear completed',
	completed: 'Completed',
	instructions: 'Double-click to edit a todo',

	// TODO: The following will be updated with an ICU-compat message once support
	// is added to `dojo-i18n`.
	itemLeft: 'item left',
	itemsLeft: 'items left',

	newTodoPlaceholder: 'What needs to be done?'
};

export default { bundlePath, locales, messages };

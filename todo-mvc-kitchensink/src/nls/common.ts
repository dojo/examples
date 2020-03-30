const locales = {
	'en-PR': () => import('./en-PR/common')
};

const messages = {
	appTitle: 'todos',
	clearButtonText: 'Clear completed',
	createdTitle: 'Created on ',
	detailsTitle: 'Details',
	editPlaceholder: 'What needs to be done?',
	filterActive: 'Active',
	filterAll: 'All',
	filterCompleted: 'Completed',
	footerInstructions: 'Double-click or press Enter to edit a todo',
	footerCredits: 'Credits:',
	footerPartOf: 'Part of ',
	itemsLeft: `{count, plural,
		=1 {item left}
		other {items left}}`,
	searchPlaceholder: 'Quick Filter',
	themeSwitchTitle: 'Pirate Mode'
};

export default { locales, messages };

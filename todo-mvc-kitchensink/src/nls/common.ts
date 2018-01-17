const locales = {
	'en-PR': () => import ('./en-PR/common')
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
	footerCredits: `Credits:
<a href="https://github.com/matt-gadd">Matt Gadd</a>,
<a href="https://github.com/agubler">Anthony Gubler</a>
and
<a href="https://github.com/Tomdye">Tom Dye</a>`,
	footerPartOf: 'Part of <a href="http://todomvc.com">TodoMVC</a>',
	itemsLeft: `{count, plural,
		=1 {item left}
		other {items left}}`,
	searchPlaceholder: 'Quick Filter',
	themeSwitchTitle: 'Pirate Mode'
};

export default { locales, messages };

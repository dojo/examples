const bundlePath = `nls/common`;
const locales: string[] = [ 'en-PR' ];

const messages = {
	appTitle: 'todos',
	clearButtonText: 'Clear Completed',
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
	itemsLeft: `<strong>{count}</strong><span>{count plural,
	one {item}
	other {items} } left</span>`,
	searchPlaceholder: 'Quick Filter',
	themeSwitchTitle: 'Pirate Mode'
};

export default { bundlePath, locales, messages };

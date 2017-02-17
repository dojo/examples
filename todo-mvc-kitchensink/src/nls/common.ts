const bundlePath = `src/nls/greetings`;
const locales: string[] = [ 'en-PR' ];

const messages = {
	appTitle: 'todos',
	editPlaceholder: 'What needs to be done?',
	footerInstructions: 'Double-click or press Enter to edit a todo',
	footerCredits: `Credits: 
<a href="https://github.com/matt-gadd">Matt Gadd</a>,
<a href="https://github.com/agubler">Anthony Gubler</a>
and
<a href="https://github.com/Tomdye">Tom Dye</a>`,
	footerPartOf: 'Part of <a href="http://todomvc.com">TodoMVC</a>',
	searchPlaceholder: 'Quick Filter',
	clearButtonText: 'Clear Completed',
	itemsLeft: `<strong>{count}</strong><span>{count plural,
	one {item}
	other {items} } left</span>`
};

export default { bundlePath, locales, messages };

import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import * as keys from 'leadfoot/keys';

registerSuite({
	name: 'basic user journey',

	setup() {
		return this.remote
			.get(require.toUrl('../../src/index.html'))
			.setFindTimeout(5000)
			.findByCssSelector('[data-widget-id=title]');
	},

	'add todo item'() {
		return this.remote
			.findByCssSelector('section.todoapp header div > input.new-todo')
				.click()
				.type('Create Dojo 2' + keys.ENTER)
				.end()
			.findByCssSelector('section.main ul.todo-list > li > div > label')
				.getVisibleText()
				.then((text: string) => {
					assert.strictEqual(text, 'Create Dojo 2');
				});
	}
});

const test = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import Page from './Page';
import '@dojo/framework/shim/Promise';

test.describe('TodoMVC - Dojo 2', function () {

	let page: Page;

	const TODO_ITEM_ONE = 'buy some cheese';
	const TODO_ITEM_TWO = 'feed the cat';
	const TODO_ITEM_THREE = 'book a doctors appointment';

	test.beforeEach(({ remote }) => {
		page = new Page(remote);
		return page.init();
	});

	test.describe('When page is initially opened', function () {

		test.it('should focus on the todo input field', function () {
			this.skip();
			return page.isNewItemInputFocused()
				.then((isNewItemInputFocused: boolean) => {
					assert.isTrue(isNewItemInputFocused);
				});
		});

	});

	test.describe('No Todos', function () {

		test.it('should hide #main and #footer', function () {
			this.skip();
			return Promise.all([ page.isMainVisible(), page.isFooterVisible() ])
				.then(([ isMainVisible, isFooterVisible ]) => {
					assert.isFalse(isMainVisible);
					assert.isFalse(isFooterVisible);
				});
		});

	});

	test.describe('New Todo', function () {

		test.it('should allow me to add todo items', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(() => page.getItem(0))
				.then((itemText: string) => {
					assert.equal(itemText, TODO_ITEM_ONE);
				})
				.then(() => page.enterItem(TODO_ITEM_TWO))
				.then(() => page.getItem(1))
				.then((itemText: string) => {
					assert.equal(itemText, TODO_ITEM_TWO);
				});
		});

		test.it('should clear text input field when an item is added', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(() => page.isNewItemInputEmpty())
				.then((isNewItemInputEmpty: boolean) => {
					assert.isTrue(isNewItemInputEmpty);
				});
		});

		test.it('should append new items to the bottom of the list', function () {
			return page.enterItems([ TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE ])
				.then(() => Promise.all([ page.getItem(0), page.getItem(1), page.getItem(2) ])
				.then(([ item1, item2, item3 ]) => {
					assert.equal(item1, TODO_ITEM_ONE);
					assert.equal(item2, TODO_ITEM_TWO);
					assert.equal(item3, TODO_ITEM_THREE);
				}));
		});

		test.it('should trim text input', function () {
			this.skip();
			return page.enterItem(`   ${TODO_ITEM_ONE}  `)
				.then(() => page.getItem(0))
				.then((itemText: string) => {
					assert.equal(itemText, TODO_ITEM_ONE);
				});
		});

		test.it('should show #main and #footer when items added', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(() => Promise.all([
					page.isMainVisible(),
					page.isFooterVisible()
				]))
				.then(([ isMainVisible, isFooterVisible ]: boolean[]) => {
					assert.isTrue(isMainVisible);
					assert.isTrue(isFooterVisible);
				});
		});

	});

	test.describe('Mark all as completed', function () {

		test.beforeEach(() => {
			return page.enterItems([ TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE ]);
		});

		test.it('should allow me to mark all items as completed', function () {
			return page.toggleAll()
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.equal(completed, 3);
				});
		});

		test.it('should correctly update the complete all checked state', function () {
			return page.toggleItem(0)
				.then(() => page.toggleItem(1))
				.then(() => page.toggleItem(2))
				.then(() => page.isCompleteAllChecked())
				.then((isCompleteAllChecked: boolean) => {
					assert.isTrue(isCompleteAllChecked);
				});
		});

		test.it('should allow me to clear the completion state of all items', function () {
			return page.toggleAll()
				.then(() => page.toggleAll())
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.strictEqual(completed, 0);
				});
		});

		test.it('complete all checkbox should update state when items are completed / cleared', function () {
			return page.toggleAll()
				.then(() => page.isCompleteAllChecked())
				.then((isCompleteAllChecked: boolean) => {
					assert.isTrue(isCompleteAllChecked);
				})
				.then(() => page.toggleItem(1))
				.then(() => page.isCompleteAllChecked())
				.then((isCompleteAllChecked: boolean) => {
					assert.isFalse(isCompleteAllChecked);
				})
				.then(() => page.toggleItem(1))
				.then(() => page.isCompleteAllChecked())
				.then((isCompleteAllChecked: boolean) => {
					assert.isTrue(isCompleteAllChecked);
				});
		});

	});

	test.describe('Todo', function () {

		test.it('should allow me to mark items as complete', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(() => page.enterItem(TODO_ITEM_TWO))
				.then(() => page.toggleItem(0))
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.strictEqual(completed, 1);
				})
				.then(() => page.toggleItem(1))
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.strictEqual(completed, 2);
				});
		});

		test.it('should allow me to un-mark items as complete', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(() => page.enterItem(TODO_ITEM_TWO))
				.then(() => page.toggleItem(0))
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.strictEqual(completed, 1);
				})
				.then(() => page.toggleItem(0))
				.then(() => page.getCompletedCount())
				.then((completed: number) => {
					assert.strictEqual(completed, 0);
				});
		});

	});

	test.describe('Editing', function () {

		test.beforeEach(function () {
		});

		test.it('should focus the input', function () {
			this.skip();
		});

		test.it('should hide other controls when editing', function () {
			this.skip();
		});

		test.it('should save edits on enter', function () {
			this.skip();
		});

		test.it('should save edits on blur', function () {
			this.skip();
		});

		test.it('should trim entered text', function () {
			this.skip();
		});

		test.it('should remove the item if an empty text string was entered', function () {
			this.skip();
		});

		test.it('should cancel edits on escape', function () {
			this.skip();
		});

	});

	test.describe('Counter', function () {

		test.it('should display the current number of todo items', function () {
			return page.enterItem(TODO_ITEM_ONE)
				.then(page.delay)
				.then(() => page.getCounterText())
				.then((counterText: string) => {
					assert.equal(counterText, '1 item left');
				})
				.then(() => page.enterItem(TODO_ITEM_TWO))
				.then(() => page.getCounterText())
				.then((counterText: string) => {
					assert.equal(counterText, '2 items left');
				});
		});

	});

	test.describe('Clear completed button', function () {

		test.beforeEach(() => {
			return page.enterItems([ TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE ]);
		});

		test.it('should display the correct text', function () {
			return page.toggleItem(1)
				.then(() => page.getClearCompletedText())
				.then((clearCompletedText: string) => {
					assert.equal(clearCompletedText, 'Clear completed');
				});

		});

		test.it('should remove completed items when clicked', function () {
			this.skip();
		});

		test.it('should be hidden when there are no items that are completed', function () {
			this.skip();
		});

	});

	test.describe('Persistence', function () {

		test.it('should persist its data', function () {
			this.skip();
		});

	});

	test.describe('Routing', function () {

		test.it('should allow me to display active items', function () {
			this.skip();
		});

		test.it('should respect the back button', function () {
			this.skip();
		});

		test.it('should allow me to display completed items', function () {
			this.skip();
		});

		test.it('should allow me to display all items', function () {
			this.skip();
		});

		test.it('should highlight the currently applied filter', function () {
			this.skip();
		});

	});

});

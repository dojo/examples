import * as keys from 'leadfoot/keys';

class Selectors {
	public main = '.main';
	public footer = 'footer.footer';
	public clearCompletedButton = 'button.clear-completed';
	public newInput = 'input.new-todo';
	public toggleAllButton = 'input.toggle-all';
	public itemCount = 'span.todo-count';
	public list = 'ul.todo-list';

	getFilter(index: number): string {
		return `.filters li:nth-of-type(${index + 1}) a'`;
	}

	getSelectedFilter(index: number): string {
		return this.getFilter(index) + '.selected';
	}

	getFilterAll(): string  {
		return this.getFilter(0);
	}

	getFilterActive(): string {
		return this.getFilter(1);
	}

	getFilterCompleted(): string {
		return this.getFilter(2);
	}

	getList(suffix: string): string {
		return 'ul.todo-list' + (suffix || '');
	}

	getListItem(index: number, suffix?: string, excludeParentSelector?: boolean): string {
		suffix = (index === undefined ? '' : ':nth-of-type(' + (index + 1) + ')') + (suffix || '');
		return excludeParentSelector ? 'li' + suffix : this.getList(' li' + suffix);
	}

	getListItemToggle(index: number): string {
		return this.getListItem(index, ' input.toggle');
	}

	getListItemLabel(index: number) {
		return this.getListItem(index, ' label');
	}

	getLastListItemLabel(index: number) {
		return this.getListItem(index, ':last-of-type label');
	}

	getListItemInput(index: number) {
		return this.getListItem(index, ' input.edit');
	}

	getEditingListItemInput() {
		return this.getListItem(undefined, '.editing input.edit');
	}
}

export default class Page {
	private remote: any;
	private selectors: Selectors;

	constructor(remote: any) {
		this.remote  = remote;
		this.selectors = new Selectors();
	}

	delay(): Promise<any> {
		return new Promise((resolve) => setTimeout(resolve, 60));
	}

	init(): Promise<any> {
		return this.remote
			.get(require.toUrl('../../src/index.html'))
			.setFindTimeout(5000)
			.findByCssSelector(this.selectors.newInput)
			.setFindTimeout(100);
	}

	isMainVisible(): Promise<boolean> {
		return this.remote
			.findByCssSelector(this.selectors.list)
			.findAllByCssSelector('li')
			.then((elems: any) => !!elems.length);
	}

	isFooterVisible(): Promise<boolean> {
		return this.remote
			.findByCssSelector(this.selectors.footer)
			.isDisplayed();
	}

	isCompleteAllChecked(): Promise<boolean> {
		return this.remote
			.then(this.delay)
			.findByCssSelector(this.selectors.toggleAllButton + ':checked')
			.then(() => true, () => false);
	}

	isNewItemInputFocused(): Promise<boolean> {
		let activeElement: any;
		return this.remote
			.getActiveElement()
			.then((element: any) => activeElement = element)
			.end()
			.findByCssSelector(this.selectors.newInput)
			.then((inputElement: any) => inputElement.equals(activeElement));
	}

	isNewItemInputEmpty(): Promise<boolean> {
		return this.remote
			.findByCssSelector(this.selectors.newInput)
			.getVisibleText()
			.then((value: string) => !value);
	}

	getItem(index: number): Promise<string> {
		return this.remote
			.findByCssSelector(this.selectors.getListItemLabel(index))
			.getProperty('innerHTML');
	}

	enterItem(text: string): Promise<any> {
		return this.remote
			.findByCssSelector(this.selectors.newInput)
			.type(text)
			.type(keys.ENTER)
			.end();
	}

	enterItems(texts: string[]): Promise<any> {
		return texts.reduce((promise, text) => {
			return promise.then(() => this.enterItem(text));
		}, Promise.resolve());
	}

	getCompletedCount(): Promise<number> {
		return this.remote
			.then(this.delay)
			.findAllByCssSelector(this.selectors.getListItem(undefined, '.completed'))
			.then((elements: any[]) => elements.length);
	}

	getCounterText(): Promise<string> {
		return this.remote
			.then(this.delay)
			.findAllByCssSelector(this.selectors.itemCount)
			.getVisibleText();
	}

	getClearCompletedText(): Promise<string> {
		return this.remote
			.then(this.delay)
			.findAllByCssSelector(this.selectors.clearCompletedButton)
			.getVisibleText();
	}

	toggleItem(index: number): Promise<any> {
		return this.remote
			.findAllByCssSelector(this.selectors.getListItemToggle(index))
			.click()
			.end();
	}

	toggleAll(): Promise<any> {
		return this.remote
			.findByCssSelector(this.selectors.toggleAllButton)
			.click()
			.end();
	}
}

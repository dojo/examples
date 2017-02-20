import * as keys from 'leadfoot/keys';

import * as todoAppCss from './../../src/widgets/styles/todoApp.css';
import * as todoFilterCss from './../../src/widgets/styles/todoFilter.css';
import * as todoItemCss from './../../src/widgets/styles/todoItem.css';
import * as todoHeaderCss from './../../src/widgets/styles/todoHeader.css';
import * as todoFooterCss from './../../src/widgets/styles/todoFooter.css';
import * as todoListCss from './../../src/widgets/styles/todoList.css';

class Selectors {
	public main = `.${todoAppCss.main}`;
	public footer = `.${todoFooterCss.footer}`;
	public clearCompletedButton = `.${todoFooterCss.clearCompleted}`;
	public newInput = `.${todoHeaderCss.newTodo}`;
	public toggleAllButton = `.${todoHeaderCss.toggleAll}`;
	public itemCount = `.${todoFooterCss.todoCount}`;
	public list = `.${todoListCss.todoList}`;

	getFilter(index: number): string {
		return `.${todoFilterCss.filters} li:nth-of-type(${index + 1}) a'`;
	}

	getSelectedFilter(index: number): string {
		return this.getFilter(index) + `.${todoFilterCss.selected}`;
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
		return this.list + (suffix || '');
	}

	getListItem(index: number | undefined, suffix?: string, excludeParentSelector?: boolean): string {
		suffix = (index === undefined ? '' : ':nth-of-type(' + (index + 1) + ')') + (suffix || '');
		return excludeParentSelector ? 'li' + suffix : this.getList(' li' + suffix);
	}

	getListItemToggle(index: number): string {
		return this.getListItem(index, ` .${todoItemCss.toggle}`);
	}

	getListItemLabel(index: number) {
		return this.getListItem(index, ` .${todoItemCss.todoLabel}`);
	}

	getLastListItemLabel(index: number) {
		return this.getListItem(index, ':last-of-type label');
	}

	getListItemInput(index: number) {
		return this.getListItem(index, ` .${todoItemCss.edit}`);
	}

	getEditingListItemInput() {
		return this.getListItem(undefined, ` .${todoItemCss.editing} .${todoItemCss.edit}`);
	}
}

export default class Page {
	private remote: any;
	private selectors: Selectors;

	constructor(remote: any) {
		this.remote  = remote;
		this.selectors = new Selectors();
	}

	delay(time: number = 60): Promise<any> {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	init(): Promise<any> {
		return this.remote
			.get('http://localhost:9000/_build/src/index.html')
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
			.then(() => true, () => false);
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
			.then(this.delay)
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
			.findAllByCssSelector(this.selectors.getListItem(undefined, `.${todoItemCss.completed}`))
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
			.findByCssSelector(this.selectors.clearCompletedButton)
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

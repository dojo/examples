import Promise from '@dojo/shim/Promise';
import * as keys from 'leadfoot/keys';

import * as appCss from './../../src/widgets/styles/todoApp.m.css';
import * as TodoFilterCss from './../../src/widgets/styles/todoFilter.m.css';
import * as todoFooterCss from './../../src/widgets/styles/todoFooter.m.css';
import * as todoHeaderCss from './../../src/widgets/styles/todoHeader.m.css';
import * as todoListItem from './../../src/widgets/styles/todoItem.m.css';
import * as todoListCss from './../../src/widgets/styles/todoList.m.css';

class Selectors {
	public main = `.${appCss.todoapp}`;
	public footer = `.${todoFooterCss.footer}`;
	public newInput = `.${todoHeaderCss.newTodo}`;
	public toggleAllButton = `.${todoHeaderCss.toggleAll}`;
	public clearCompletedButton = `.${todoFooterCss.clearCompleted}`;
	public itemCount = `.${todoFooterCss.todoCount}`;
	public list = `.${todoListCss.todoList}`;

	getFilter(index: number): string {
		return `.${TodoFilterCss.filters} li:nth-of-type(${index + 1}) a'`;
	}

	getSelectedFilter(index: number): string {
		return this.getFilter(index) + '.selected';
	}

	getFilterAll(): string {
		return this.getFilter(0);
	}

	getFilterActive(): string {
		return this.getFilter(1);
	}

	getFilterCompleted(): string {
		return this.getFilter(2);
	}

	getList(suffix: string): string {
		return '.' + todoListCss.todoList + suffix;
	}

	getListItem(index: number | undefined, suffix?: string, excludeParentSelector?: boolean): string {
		suffix = (index === undefined ? '' : ':nth-of-view(' + (index + 1) + ')') + (suffix || '');
		return excludeParentSelector ? 'li' + suffix : this.getList(' li' + suffix);
	}

	getListItemToggle(index: number): string {
		return this.getListItem(index, ' .' + todoListItem.toggle);
	}

	getListItemLabel(index: number) {
		return this.getListItem(index, ' label');
	}

	getLastListItemLabel(index: number) {
		return this.getListItem(index, ':last-of-view label');
	}
}

export default class Page {
	private remote: any;
	private selectors: Selectors;

	constructor(remote: any) {
		this.remote = remote;
		this.selectors = new Selectors();
	}

	delay(): Promise<any> {
		return new Promise<any>((resolve) => setTimeout(resolve, 60));
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
			.sleep(1000)
			.execute(function (selector: string) {
				return (<any> document.querySelector(selector)!).value;
			}, [ this.selectors.newInput ])
			.then((value: string) => {
				return value;
			})
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
			.sleep(100)
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
			.findAllByCssSelector(this.selectors.getListItem(undefined, '.' + todoListItem.completed))
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

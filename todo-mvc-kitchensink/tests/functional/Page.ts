import '@dojo/shim/Promise';
import * as keys from 'leadfoot/keys';

import * as appCss from './../../src/widgets/styles/App.css';
import * as checkbox from './../../src/widgets/styles/CheckboxInput.css';
import * as todoEditInputCss from './../../src/widgets/styles/TodoEditInput.css';
import * as TodoFilterCss from './../../src/widgets/styles/TodoFilter.css';
import * as todoFooterCss from './../../src/widgets/styles/TodoFooter.css';
import * as todoListItem from './../../src/widgets/styles/TodoItem.css';
import * as todoListCss from './../../src/widgets/styles/TodoItemList.css';
import * as toggler from './../../src/widgets/styles/Toggler.css';

class Selectors {
	public main = `.${appCss.todoapp}`;
	public footer = `.${todoFooterCss.footer}`;
	public clearCompletedButton = `.${todoFooterCss.clearCompleted}`;
	public newInput = `.${todoEditInputCss.todoEditInput}`;
	public toggleAllButton = `.${checkbox.checkbox}`;
	public itemCount = `.${todoFooterCss.todoCount}`;
	public list = `.${todoListCss.todoItemList}`;

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
		return '.' + todoListCss.todoItemList + suffix;
	}

	getListItem(index: number | undefined, suffix?: string, excludeParentSelector?: boolean): string {
		suffix = (index === undefined ? '' : ':nth-of-type(' + (index + 1) + ')') + (suffix || '');
		return excludeParentSelector ? 'li' + suffix : this.getList(' li' + suffix);
	}

	getListItemToggle(index: number): string {
		return this.getListItem(index, ' .' + toggler.toggle);
	}

	getListItemLabel(index: number) {
		return this.getListItem(index, ' label');
	}

	getLastListItemLabel(index: number) {
		return this.getListItem(index, ':last-of-type label');
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
		return new Promise((resolve) => setTimeout(resolve, 60));
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

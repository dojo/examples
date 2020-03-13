import Promise from '@dojo/framework/shim/Promise';
import keys from '@theintern/leadfoot/keys';
import { Remote } from 'intern/lib/executors/Node';

import * as css from './../../src/App.m.css';

class Selectors {
	public main = `.${css.main}`;
	public footer = `.${css.footer}`;
	public clearCompletedButton = `.${css.clearCompleted}`;
	public newInput = `.${css.newTodo}`;
	public toggleAllButton = `.${css.toggleAll}`;
	public itemCount = `.${css.todoCountLabel}`;
	public list = `.${css.todoList}`;

	getFilter(index: number): string {
		return `.${css.filters} li:nth-of-type(${index + 1}) a'`;
	}

	getSelectedFilter(index: number): string {
		return this.getFilter(index) + `.${css.selected}`;
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
		return this.list + (suffix || '');
	}

	getListItem(index: number | undefined, suffix?: string, excludeParentSelector?: boolean): string {
		suffix = (index === undefined ? '' : ':nth-of-type(' + (index + 1) + ')') + (suffix || '');
		return excludeParentSelector ? 'li' + suffix : this.getList(' li' + suffix);
	}

	getListItemToggle(index: number): string {
		return this.getListItem(index, ` .${css.toggle}`);
	}

	getListItemLabel(index: number) {
		return this.getListItem(index, ` .${css.todoLabel}`);
	}

	getLastListItemLabel(index: number) {
		return this.getListItem(index, ':last-of-type label');
	}

	getListItemInput(index: number) {
		return this.getListItem(index, ` .${css.edit}`);
	}

	getEditingListItemInput() {
		return this.getListItem(undefined, ` .${css.editing} .${css.edit}`);
	}
}

export default class Page {
	private remote: Remote;
	private selectors: Selectors;

	constructor(remote: Remote) {
		this.remote = remote;
		this.selectors = new Selectors();
	}

	delay(time: number = 60) {
		return new Promise<any>((resolve) => setTimeout(resolve, time));
	}

	init() {
		return this.remote
			.get('http://localhost:9000/output/dist/index.html')
			.setFindTimeout(5000)
			.findByCssSelector(this.selectors.newInput)
			.setFindTimeout(100);
	}

	isMainVisible() {
		return this.remote
			.findByCssSelector(this.selectors.list)
			.findAllByCssSelector('li')
			.then((elems: any) => !!elems.length);
	}

	isFooterVisible() {
		return this.remote.findByCssSelector(this.selectors.footer).then(
			() => true,
			() => false
		);
	}

	isCompleteAllChecked() {
		return this.remote
			.then(this.delay)
			.findByCssSelector(this.selectors.toggleAllButton + ':checked')
			.then(
				() => true,
				() => false
			);
	}

	isNewItemInputFocused() {
		let activeElement: any;
		return this.remote
			.getActiveElement()
			.then((element) => (activeElement = element))
			.end()
			.findByCssSelector(this.selectors.newInput)
			.then((inputElement) => inputElement.equals(activeElement));
	}

	isNewItemInputEmpty() {
		return this.remote
			.findByCssSelector(this.selectors.newInput)
			.getVisibleText()
			.then((value: string) => !value);
	}

	getItem(index: number) {
		return this.remote
			.findByCssSelector(this.selectors.getListItemLabel(index))
			.getProperty('innerHTML')
			.then((value: string) => value);
	}

	enterItem(text: string) {
		return this.remote
			.findByCssSelector(this.selectors.newInput)
			.type(text)
			.type(keys.ENTER)
			.then(() => this.delay())
			.end();
	}

	enterItems(texts: string[]) {
		return texts.reduce((promise, text) => {
			return promise.then(() => this.enterItem(text));
		}, Promise.resolve());
	}

	getCompletedCount() {
		return this.remote
			.then(this.delay)
			.findAllByCssSelector(this.selectors.getListItem(undefined, `.${css.completed}`))
			.then((elements: any[]) => elements.length);
	}

	getCounterText() {
		return this.remote
			.then(this.delay)
			.findByCssSelector(this.selectors.itemCount)
			.getVisibleText();
	}

	getClearCompletedText() {
		return this.remote
			.then(this.delay)
			.findByCssSelector(this.selectors.clearCompletedButton)
			.getVisibleText();
	}

	toggleItem(index: number) {
		return this.remote
			.findAllByCssSelector(this.selectors.getListItemToggle(index))
			.click()
			.end();
	}

	toggleAll() {
		return this.remote
			.findByCssSelector(this.selectors.toggleAllButton)
			.click()
			.end();
	}
}

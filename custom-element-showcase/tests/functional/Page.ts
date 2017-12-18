import { Remote } from 'intern/lib/executors/Node';


class Selectors {
	public dialog = 'dojo-dialog';
	public dialogButton = '#dialog-button';
	public dialogContent = 'dojo-dialog .dialog-content-container';
	public dialogCloseButton = 'dojo-dialog button';
	public slidePane = 'dojo-slide-pane';
	public slidePaneButton = '#slide-pane-button';
	public slidePaneContent = 'dojo-slide-pane .slide-pane-content';
	public slidePaneOverlay = 'dojo-slide-pane > div > div';
	public accordionTitlePaneOne = '#title-pane-button-1';
	public accordionTitlePaneTwo = '#title-pane-button-2';
	public accordionTitlePaneOneContent = 'dojo-accordionpane dojo-title-pane:first-child > div > div:last-child';
	public accordionTitlePaneTwoContent = 'dojo-accordionpane dojo-title-pane:last-child > div > div:last-child';
	public tooltip = 'dojo-tooltip';
	public tooltipButton = '#tooltip-button';
	public tooltipContent = 'dojo-tooltip > div > div:last-child';
	public calendarMonthButton = 'dojo-calendar div[role="menubar"] button:nth-child(2)';
	public calendarYearButton = 'dojo-calendar div[role="menubar"] button:last-child';
	public calendarPreviousButton = 'dojo-calendar > div > div:last-child button:first-child';
	public calendarNextButton = 'dojo-calendar > div > div:last-child button:last-child';

	public calendarDay = 'dojo-calendar table tbody td[role="gridcell"][tabindex="0"]';
	public januaryLabel = 'dojo-calendar fieldset abbr[title="January"]';

	public yearLabel(year: number) {
		return `dojo-calendar fieldset input[value="${year}"]`;
	}
}

export default class Page {
	private remote: Remote;
	private selectors: Selectors;

	constructor(remote: Remote) {
		this.remote = remote;
		this.selectors = new Selectors();
	}

	init() {
		return this.remote
			.get('http://localhost:9000/dist/index.html')
			.setFindTimeout(5000)
			.findByCssSelector(this.selectors.dialog)
			.setFindTimeout(100);
	}

	isVisible(selector: string) {
		return this.remote
			.findByCssSelector(selector)
			.isDisplayed()
			.then(value => value, () => false);
	}

	getAttributeTruthiness(selector: string, attribute: string) {
		return this.remote
			.findByCssSelector(selector)
			.getAttribute(attribute)
			.then(attribute => Boolean(attribute && attribute !== 'false'));
	}

	click(selector: string) {
		return this.remote
			.findByCssSelector(selector)
			.click()
			.sleep(500)
			.end();
	}

	getTextContent(selector: string) {
		return this.remote
			.findByCssSelector(selector)
			.getProperty('textContent');
	}

	getMonthLabel() {
		return this.getTextContent(this.selectors.calendarMonthButton);
	}

	getYearLabel() {
		return this.getTextContent(this.selectors.calendarYearButton);
	}
}

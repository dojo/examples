import Page from './Page';
import '@dojo/shim/Promise';

const { assert } = intern.getPlugin('chai');
const { it, describe, beforeEach } = intern.getInterface('bdd');

describe('Custom Element Showcase - Dojo 2', function (this: any) {

	let page: any;

	beforeEach(({ remote }) => {
		page = new Page(remote);
		return page.init();
	});

	describe('Dialog', () => {
		it('should not be visible by default', () =>
			page.isVisible(page.selectors.dialogContent)
				.then((visible: boolean) => assert.isFalse(visible, 'Dialog should not be visible by default'))
		);

		it('should open when its open attribute is set to true, and close when set to false', () =>
			page.isVisible(page.selectors.dialogContent)
				// Check that is starts closed and verify the open attribute value
				.then((visible: boolean) => assert.isFalse(visible, 'Dialog should not be visible by default'))
				.then(() => page.getAttribute(page.selectors.dialog, 'open'))
				.then((open?: string) => assert.isTrue(!open || open === 'false',
					'Open attribute should be false when dialog is not visible'))
				// Open the dialog
				.then(() => page.click(page.selectors.dialogButton))
				// Verify that it's open
				.then(() => page.isVisible(page.selectors.dialogContent))
				.then((visible: boolean) => assert.isTrue(visible, 'Dialog should be visible after clicking open button'))
				.then(() => page.getAttribute(page.selectors.dialog, 'open'))
				.then((open: string) => assert.equal(open, 'true', 'Open attribute should be true when dialog is visible'))
				// Close the dialog
				.then(() => page.click(page.selectors.dialogCloseButton))
				// Verify that it's closed
				.then(() => page.isVisible(page.selectors.dialogContent))
				.then((visible: boolean) => assert.isFalse(visible,
					'Dialog should not be visible after the close button was clcked'))
				.then(() => page.getAttribute(page.selectors.dialog, 'open'))
				.then((open?: string) => assert.isTrue(!open || open === 'false',
					'Open attribute should be false after dialog is closed'))
		);
	});

	describe('SlidePane', () => {
		it('should be hidden by default', () =>
			page.isVisible(page.selectors.slidePaneContent)
				.then((visible: boolean) => assert.isFalse(visible, 'Should not be visible by default'))
		);

		it('should become visible when open attribute is true, and close when it is false', () =>
			page.isVisible(page.selectors.slidePaneContent)
				// Verify it starts closed
				.then((visible: boolean) => assert.isFalse(visible, 'Should not be visible by default'))
				.then(() => page.getAttribute(page.selectors.slidePane, 'open'))
				.then((open?: string) => assert.isTrue(!open || open === 'false', 'Open attribute should be false when pane is closed'))
				// Open the slide pane
				.then(() => page.click(page.selectors.slidePaneButton))
				// Verify that it's open
				.then(() => page.isVisible(page.selectors.slidePaneContent))
				.then((visible: boolean) => assert.isTrue(visible, 'Should not be visible by default'))
				.then(() => page.getAttribute(page.selectors.slidePane, 'open'))
				.then((open: string) => assert.equal(open, 'true', 'Open attribute should be true when slide pane is open'))
				// Close the slide pane
				.then(() => page.clickAt())
				// Verify that it closed
				.then(() => page.isVisible(page.selectors.slidePaneContent))
				.then((visible: boolean) => assert.isFalse(visible, 'Should not be visible by default'))
				.then(() => page.getAttribute(page.selectors.slidePane, 'open'))
				.then((open?: string) => assert.isTrue(!open || open === 'false', 'Open attribute should be false when pane is closed'))
		);

		describe('AccordionPane', () => {
			it('should have both title panes closed by default', () =>
				page.isVisible(page.selector.accordionTitlePaneOneContent)
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible be default'))
					.then(() => page.isVisible(page.selector.accordionTitlePaneTwoContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible be default'))
			);

			it('should toggle title pane visibility based on accordion pane properties', () =>
				page.isVisible(page.selector.accordionTitlePaneOneContent)
					// Verify that both panes start closed
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible by default'))
					.then(() => page.isVisible(page.selector.accordionTitlePaneTwoContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible by default'))
					// Open one pane with an independent button
					.then(() => page.click(page.selectors.accordionTitlePaneOne))
					// Verify only one is open
					.then(() => page.isVisible(page.selector.accordionTitlePaneOneContent))
					.then((visible: boolean) => assert.isTrue(visible, 'Title pane content should be visible after clicking open'))
					.then(() => page.isVisible(page.selector.accordionTitlePaneTwoContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible by default'))
					// Open the other pane
					.then(() => page.click(page.selectors.accordionTitlePaneTwo))
					// Verify both are open
					.then(() => page.isVisible(page.selector.accordionTitlePaneOneContent))
					.then((visible: boolean) => assert.isTrue(visible, 'Title pane content should be visible after clicking open'))
					.then(() => page.isVisible(page.selector.accordionTitlePaneTwoContent))
					.then((visible: boolean) => assert.isTrue(visible, 'Title pane content should be visible after clicking open'))
					// Close both panes
					.then(() => page.click(page.selectors.accordionTitlePaneOne))
					.then(() => page.click(page.selectors.accordionTitlePaneTwo))
					// Verify both are closed
					.then(() => page.isVisible(page.selector.accordionTitlePaneOneContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible after closing'))
					.then(() => page.isVisible(page.selector.accordionTitlePaneTwoContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Title pane content should not be visible after closing'))
			)
		});

		describe('Tooltip', () => {
			it('should be hidden by default', () =>
				page.isVisible(page.selectors.tooltipContent)
					.then((visible: boolean) => assert.isFalse(visible, 'Tooltip should be hidden by default'))
			);

			it('should become visible based on its open attribute toggled', () =>
				page.isVisible(page.selectors.tooltipContent)
					// Verify it starts hidden
					.then((visible: boolean) => assert.isFalse(visible, 'Tooltip should be hidden by default'))
					.then(() => page.getAttribute(page.selectors.tooltip, 'open'))
					.then((open?: string) => assert.isTrue(!open || open === 'false', 'Open attribute should be false before tooltip is opened'))
					// Open the tooltip
					.then(() => page.click(page.selectors.tooltipButton))
					.then(() => page.isVisible(page.selectors.tooltipContent))
					.then((visible: boolean) => assert.isTrue(visible, 'Tooltip should be visible after being opened'))
					.then(() => page.getAttribute(page.selectors.tooltip, 'open'))
					.then((open: string) => assert.equal(open, 'true', 'Open attribute should be true when tooltip is open'))
					// Close the tooltip
					.then(() => page.click(page.selectors.tooltipButton))
					.then(() => page.isVisible(page.selectors.tooltipContent))
					.then((visible: boolean) => assert.isFalse(visible, 'Tooltip should not be visible after being closed'))
					.then(() => page.getAttribute(page.selectors.tooltip, 'open'))
					.then((open?: string) => assert.isTrue(!open || open === 'false', 'Open attribute should be false after tooltip is closed'))
			);
		});

		describe('calendar', () => {
			const months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			const now = new Date(Date.now());

			const currentMonth = months[now.getMonth()];
			const currentYear =  now.getFullYear();

			it('should display the current month and year by default', () =>
				page.getTextContent(page.selectors.calendarMonthButton)
					.then((month: string) => assert.equal(month, currentMonth, 'Should display current month'))
					.then(() => page.getTextContent(page.selectors.calendarYearButton))
					.then((year: string) => assert.equal(year, String(currentYear), 'Should display current year'))
			);

			it('should update the current month and year using the next and previous buttons', () =>
				// Go to next month
				page.click(page.selectors.calendarNextButton)
					.then(() => page.getTextContent(page.selectors.calendarMonthButton))
					.then((month: string) => assert.equal(month, months[(months.indexOf(currentMonth) + 1) % months.length],
						'Should display next month after clicking next button'))
					// Go back to current month
					.then(() => page.click(page.selectors.calendarPreviousButton))
					.then(() => page.getTextContent(page.selectors.calendarMonthButton))
					.then((month: string) => assert.equal(month, currentMonth, 'Should display current month after clicking previous button back'))
					// Navigate to current month next year
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.click(page.selectors.calendarNextButton))
					.then(() => page.getTextContent(page.selectors.calendarMonthButton))
					.then((month: string) => assert.equal(month, currentMonth,
						'Should display current month after navigating to next year'))
					.then(() => page.getTextContent(page.selectors.calendarYearButton))
					.then((year: string) => assert.equal(year, String(currentYear + 1), 'Should display next year'))
			);

			it('should allow the month to be selected by clicking the month button', () =>
				page.click(page.selectors.calendarMonthButton)
					.then(() => page.click(page.selectors.januaryLabel))
					.then(() => page.getTextContent(page.selectors.calendarMonthButton))
					.then((month: string) => assert.equal(month, months[0],
						'Should display January in month button after selecting it'))
			);

			it('should allow the year to be selected by clicking the year button', () =>
				page.click(page.selectors.calendarYearButton)
					.then(() => page.click(page.selectors.yearLabel(currentYear + 1)))
					.then(() => page.getTextContent(page.selectors.calendarYearButton))
					.then((year: string) => assert.equal(year, String(currentYear + 1),
						'Should display next year after selecting it'))
			);

			it('should allow the day to be selected', () =>
				page.getAttribute(page.selectors.calendarDay, 'selected')
					.then((selected?: string) => assert.isTrue(!selected || selected === 'false',
						'Day should not be selected by default'))
					.then(() => page.click(page.selectors.calendarDay))
					.then(() => page.getAttribute(page.selectors.calendarDay))
					.then((selected?: string) => assert.equal(selected, 'true', 'Day should be selected after clicking it'))
			);
		})
	});
});

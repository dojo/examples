interface CustomElement extends HTMLElement {
	[index: string]: any;
}

interface Event {
	detail: any;
}

interface Dojoce {
	theme: string;
	themes: { [index: string]: any };
}

interface Window {
	dojoce: Dojoce;
}

function getCustomElement(id: string): CustomElement {
	const element = document.getElementById(id)
	if (!element) {
		throw new Error(`cannot find ${id}`);
	}
	return element;
}

// Main Tool Bar
const menu = getCustomElement('dojoToolbar');
menu.collapseWidth = 700;
menu.fixed = true;
menu.menuTitle = 'Menu';
menu.title = 'Dojo 2 Custom Element Showcase';

// Split Pane
const splitpane = getCustomElement('dojoSplitPane');
splitpane.size = 500;
splitpane.addEventListener('resize', (event) => {
	splitpane.size = event.detail[0];
});

// Accordian
const panes = getCustomElement('dojoAccordianPane');
const openPaneKeys: string[] = [];
panes.addEventListener('requestopen', (event) => {
	const openKey = event.detail[0];
	const keyIndex = openPaneKeys.indexOf(openKey);
	if (keyIndex === -1) {
		openPaneKeys.push(openKey);
	}
	panes.openKeys = openPaneKeys;
});
panes.addEventListener('requestclose', (event) => {
	const openKey = event.detail[0];
	const keyIndex = openPaneKeys.indexOf(openKey);
	if (keyIndex !== -1) {
		openPaneKeys.splice(keyIndex, 1);
	}
	panes.openKeys = openPaneKeys;
});

// Theme
const themePane = getCustomElement('themePane');
const themes = Object.keys(window.dojoce.themes);
const currentTheme = window.dojoce.theme;
let selectedRadio: CustomElement | undefined;

themes.forEach((theme) => {
	const radio = document.createElement('dojo-radio') as CustomElement;
	radio.checked = theme === currentTheme;
	if (radio.checked) {
		selectedRadio = radio;
	}
	radio.addEventListener('change', (event) => {
		if (event.detail) {
			window.dojoce.theme = event.detail[0];
			selectedRadio!.checked = false;
			radio.checked = true;
			selectedRadio = radio;
		}
	});
	radio.setAttribute('label', theme);
	radio.setAttribute('value', theme);
	themePane.appendChild(radio);
});

// Calendar
const calendar = getCustomElement('dojoCalendar');
const selectedDate = getCustomElement('dojoCalendarLabel');

calendar.selectedDate = new Date();
selectedDate.setAttribute('label', calendar.selectedDate.toDateString());
calendar.addEventListener('monthchange', (event) => {
	calendar.month = event.detail[0];
});
calendar.addEventListener('yearchange', (event) => {
	calendar.year = event.detail[0];
});
calendar.addEventListener('dateselect', (event) => {
	calendar.selectedDate = event.detail[0];
	selectedDate.setAttribute('label', calendar.selectedDate.toDateString());
});

// Dialog
const dialog = getCustomElement('dojoDialog');
const openDialogButton = getCustomElement('dojoDialogButton');
dialog.modal = true;
dialog.underlay = true;
dialog.closeable = true;
dialog.open = false;
openDialogButton.addEventListener('click', () => {
	dialog.open = true;
});
dialog.addEventListener('requestclose', () => {
	dialog.open = false;
});

// Tab Controller
const tabController = getCustomElement('dojoTabController');
const basicTab = getCustomElement('dojoTabBasic');
const inputsTab = getCustomElement('dojoTabInputs');
const textareaTab = getCustomElement('dojoTabTextArea');
const selectsTab = getCustomElement('dojoTabSelects');
const progressTab = getCustomElement('dojoTabProgress');
const sliderTab = getCustomElement('dojoTabSlider');

tabController.activeIndex = 0;
tabController.addEventListener('requesttabchange', (event) => {
	tabController.activeIndex = event.detail[0];
});

// Basic Form Widgets
basicTab.label = "Basic Form Widgets";

// Buttons

const popupButton = getCustomElement('dojoEnabledPopupButton');
const toggleButton = getCustomElement('dojoEnabledToggleButton');
const disabledBasicButton = getCustomElement('dojoDisabledBasicButton');
const disabledIconButton = getCustomElement('dojoDisabledIconButton');
const disabledPopupButton = getCustomElement('dojoDisabledPopupButton');
const disabledToggleButton = getCustomElement('dojoDisabledToggleButton');

toggleButton.addEventListener('click', () => {
	popupButton.pressed = !popupButton.pressed;
});
popupButton.popup = {
	expanded: false,
	id: 'dojoPopupButton'
};

disabledBasicButton.disabled = true;
disabledIconButton.disabled = true;
disabledPopupButton.popup = {
	expanded: false,
	id: 'dojoPopupButton'
};
disabledPopupButton.disabled = true;
disabledToggleButton.disabled = true;
disabledToggleButton.addEventListener('click', () => {
	disabledToggleButton.pressed = !disabledToggleButton.pressed;
});

// Checkbox
const checkbox = getCustomElement('dojoCheckedCheckbox');
const disabledCheckedCheckbox = getCustomElement('dojoDisabledCheckedCheckbox');
const disabledCheckbox = getCustomElement('dojoDisabledUnCheckedCheckbox');

checkbox.checked = true;
checkbox.addEventListener('change', () => {
	checkbox.checked = !checkbox.checked;
});

disabledCheckedCheckbox.checked = true;
disabledCheckedCheckbox.disabled = true;
disabledCheckbox.disabled = true;

// Text Input Widgets
inputsTab.label = "Text Input Widgets";

const textInput = getCustomElement('dojoTextInput');
const requiredInput = getCustomElement('dojoRequiredTextInput');
const emailInput = getCustomElement('dojoEmailTextInput');
const disabledInput = getCustomElement('dojoDisabledTextInput');
const twitterInput = getCustomElement('dojoTwitterEnhancedInput');
const priceInput = getCustomElement('dojoPriceEnhancedInput');

textInput.addEventListener('input', (event) => {
	if (event.detail) {
		textInput.setAttribute('value', event.detail[0]);
	}
});

requiredInput.addEventListener('input', (event) => {
	if (event.detail) {
		requiredInput.setAttribute('value', event.detail[0]);
	}
});

emailInput.addEventListener('input', (event) => {
	if (event.detail) {
		emailInput.setAttribute('value', event.detail[0]);
	}
});

requiredInput.required = true;
disabledInput.value = "Initial Value";
disabledInput.disabled = true;
disabledInput.readOnly = true;

twitterInput.addonBefore = [ '@' ];
priceInput.addonBefore = [ '$' ];
priceInput.addonAfter = [ '.00' ];

twitterInput.addEventListener('input', (event) => {
	if (event.detail) {
		twitterInput.setAttribute('value', event.detail[0]);
	}
});

priceInput.addEventListener('input', (event) => {
	if (event.detail) {
		priceInput.setAttribute('value', event.detail[0]);
	}
});


const timePicker = getCustomElement('dojoBasicTimePicker');

timePicker.clearable = true;
timePicker.end = '23:59';
timePicker.label = 'Basic Time Picker';
timePicker.start = '00:00';
timePicker.step = 1800;
timePicker.value = '10:30';
timePicker.options = undefined;
timePicker.addEventListener('change', (event) => {
	if (event.detail) {
		timePicker.value = event.detail[0].value;
	}
});

textareaTab.label = "Text Area";

const textarea = getCustomElement('dojoTextarea');
const disabledTextarea = getCustomElement('dojoDisabledTextarea');

textarea.columns = 40;
textarea.rows = 8;
textarea.placeholder = 'Hello, World';

disabledTextarea.columns = 40;
disabledTextarea.rows = 8;
disabledTextarea.placeholder = 'Hello, World';
disabledTextarea.disabled = true;

// Selects
selectsTab.label = "Selects";

const select = getCustomElement('dojoSimpleSelect');
const disabledSelect = getCustomElement('dojoSimpleDisabledSelect');
const nativeSelect = getCustomElement('dojoNativeSelect');
const disabledNativeSelect = getCustomElement('dojoDisabledNativeSelect');
const complexSelect = getCustomElement('dojoComplexSelect');
const complexNativeSelect = getCustomElement('dojoComplexNativeSelect');

select.options = [ 'foo', 'bar', 'baz', 'qux' ];
disabledSelect.disabled = true;
disabledSelect.options = [ 'foo', 'bar', 'baz', 'qux' ];
nativeSelect.options = [ 'foo', 'bar', 'baz', 'qux' ];
nativeSelect.useNativeElement = true;
disabledNativeSelect.options = [ 'foo', 'bar', 'baz', 'qux' ];
disabledNativeSelect.useNativeElement = true;
disabledNativeSelect.disabled = true;

const animalOptions = [
	{
		value: 'cat',
		label: 'Cat'
	},
	{
		value: 'dog',
		label: 'Dog'
	},
	{
		value: 'hamster',
		label: 'Hamster'
	},
	{
		value: 'goat',
		label: 'Goat',
		disabled: true
	}
];

const getOptionDisabled = (option: any) => {
	return option.disabled;
}
const getOptionLabel = (option: any) => {
	return option.label;
}
const getOptionValue = (option: any) => {
	return option.value;
}

complexSelect.options = animalOptions;
complexSelect.getOptionDisabled = getOptionDisabled;
complexSelect.getOptionLabel = getOptionLabel;
complexSelect.getOptionValue = getOptionValue;

complexNativeSelect.useNativeElement = true;
complexNativeSelect.options = animalOptions;
complexNativeSelect.getOptionDisabled = getOptionDisabled;
complexNativeSelect.getOptionLabel = getOptionLabel;
complexNativeSelect.getOptionValue = getOptionValue;

// Progress
progressTab.label = "Progress";

const progress = getCustomElement('dojoProgress');
const progressMaxOne = getCustomElement('dojoProgressMaxOne');
const progressCustomOutput = getCustomElement('dojoProgressCustomOutput');
const progressNoOutput = getCustomElement('dojoProgressNoOutput');

progress.value = 50;
progressMaxOne.value = 0.3;
progressMaxOne.max = 1;
progressCustomOutput.value = 250;
progressCustomOutput.max = 750;
progressCustomOutput.output = function(value: number, percent: number) {
	return `${value} of 750 is ${percent}`;
}
progressNoOutput.value = 10;
progressNoOutput.showOutput = false;

// Sliders
sliderTab.label = "Slider";

const slider = getCustomElement('dojoSlider');
const disabledSlider = getCustomElement('dojoDisabledSlider');
const verticalSlider = getCustomElement('dojoVerticalSlider');

slider.min = 0;
slider.max = 100;
slider.step = 1;
slider.output = (value: number) => {
	if (value < 20) { return 'I am a Klingon'; }
	if (value < 40) { return 'Tribbles only cause trouble'; }
	if (value < 60) { return 'They\`re kind of cute'; }
	if (value < 80) { return 'Most of my salary goes to tribble food'; }
	else { return 'I permanently altered the ecology of a planet for my tribbles'; }
}
slider.value = 50;
slider.addEventListener('input', (event) => {
	slider.value = event.detail[0];
});
disabledSlider.min = 0;
disabledSlider.max = 100;
disabledSlider.step = 1;
disabledSlider.value = 30;
disabledSlider.disabled = true;
verticalSlider.value = 0;
verticalSlider.vertical = true;
verticalSlider.invalid = false;
verticalSlider.outputIsTooltip = true;
verticalSlider.output = function (value: number) {
	return `${value}${verticalSlider.invalid ? '!': ''}`;
}
verticalSlider.addEventListener('input', (event) => {
	const value = event.detail[0];
	verticalSlider.invalid = value > 50;
	verticalSlider.value = value;
});

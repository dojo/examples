import { deepAssign } from '@dojo/core/lang';
import { DNode, WidgetProperties, TypedTargetEvent } from '@dojo/widget-core/interfaces';
import { includes, from } from '@dojo/shim/array';
import { Set } from '@dojo/shim/Set';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { ThemedMixin, ThemedProperties, theme } from '@dojo/widget-core/mixins/Themed';
import { v, w } from '@dojo/widget-core/d';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import dojoTheme from '@dojo/widgets/themes/dojo/theme';
import Task from '@dojo/core/async/Task';

import AccordionPane from '@dojo/widgets/accordionpane/AccordionPane';
import Button from '@dojo/widgets/button/Button';
import Calendar from '@dojo/widgets/calendar/Calendar';
import Checkbox, { Mode } from '@dojo/widgets/checkbox/Checkbox';
import ComboBox from '@dojo/widgets/combobox/ComboBox';
import Dialog from '@dojo/widgets/dialog/Dialog';
import Radio from '@dojo/widgets/radio/Radio';
import Select from '@dojo/widgets/select/Select';
import SlidePane, { Align } from '@dojo/widgets/slidepane/SlidePane';
import Slider from '@dojo/widgets/slider/Slider';
import SplitPane, { Direction } from '@dojo/widgets/splitpane/SplitPane';
import Tab from '@dojo/widgets/tabcontroller/Tab';
import TabController from '@dojo/widgets/tabcontroller/TabController';
import Textarea from '@dojo/widgets/textarea/Textarea';
import TextInput from '@dojo/widgets/textinput/TextInput';
import TimePicker, { TimeUnits } from '@dojo/widgets/timepicker/TimePicker';
import TitlePane from '@dojo/widgets/titlepane/TitlePane';
import Tooltip, { Orientation } from '@dojo/widgets/tooltip/Tooltip';

import { dataLarge, dataSmall} from './data';
import * as css from './styles/app.m.css';

interface State {
	activeTabIndex: number;
	buttonPressed: boolean;
	checkboxBasic: boolean;
	checkboxToggle: boolean;
	closedTabKeys: string[];
	comboboxResults: { value: string; }[];
	comboboxValue: string;
	dialogOpen: boolean;
	loadingTab: boolean;
	multiselectValue: string;
	nestedSizeA?: number;
	nestedSizeB?: number;
	radioValue: string;
	selectValue: string;
	slidepaneOpen: boolean;
	sliderValue?: number;
	textareaValue: string;
	textinputValue: string;
	timepickerOptions: TimeUnits[];
	titlepaneOpen: boolean;
	tooltipOpen: boolean;
	month?: number;
	selectedDate?: Date;
	timepickerValue: string;
	year?: number;
}

export const AppBase = ThemedMixin(WidgetBase);

@theme(css)
export default class App extends AppBase<WidgetProperties> {
	private _month: number;
	private _year: number;
	private _selectedDate: Date;
	private _tabRefresh: Task<any>;
	private _openAccordionKeys = new Set<string>();
	private _state: State = {
		activeTabIndex: 0,
		buttonPressed: false,
		checkboxBasic: false,
		checkboxToggle: false,
		closedTabKeys: [],
		comboboxResults: [],
		comboboxValue: '',
		dialogOpen: false,
		loadingTab: false,
		multiselectValue: '',
		nestedSizeA: undefined,
		nestedSizeB: undefined,
		radioValue: 'first',
		selectValue: '',
		slidepaneOpen: false,
		sliderValue: undefined,
		textareaValue: '',
		textinputValue: '',
		timepickerOptions: [],
		timepickerValue: '',
		titlepaneOpen: false,
		tooltipOpen: false,
		month: undefined,
		selectedDate: undefined,
		year: undefined
	};

	private refreshTabData() {
		return new Task((resolve, reject) => {
			setTimeout(resolve, 1500);
		});
	}

	private setState(state: Partial<State>) {
		this._state = deepAssign(this._state, state);
		this.invalidate();
	}

	protected render(): DNode | DNode[] {
		const {
			activeTabIndex,
			buttonPressed,
			checkboxBasic,
			checkboxToggle,
			closedTabKeys,
			comboboxResults,
			comboboxValue,
			dialogOpen,
			loadingTab,
			multiselectValue,
			nestedSizeB,
			radioValue,
			selectValue,
			slidepaneOpen,
			sliderValue,
			textareaValue,
			textinputValue,
			timepickerOptions,
			timepickerValue,
			titlepaneOpen,
			tooltipOpen,
			month,
			nestedSizeA,
			selectedDate,
			year
		} = this._state;

		return v('div', { classes: this.theme(css.content) }, [
			v('h1', [ 'Form components' ]),
			v('div', { classes: this.theme(css.component) }, [
				w(Button, {
					key: 'basic-button',
					theme: dojoTheme
				}, [ 'Basic' ])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Button, {
					key: 'popup-button',
					theme: dojoTheme,
					popup: { expanded: false, id: 'fakeId' }
				}, [ 'Popup' ]),
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Button, {
					key: 'pressed-button',
					theme: dojoTheme,
					pressed: buttonPressed,
					onClick: () => {
						this.setState({ buttonPressed: !buttonPressed })
					}
				}, [ 'Toggle' ])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Checkbox, {
					key: 'cb1',
					checked: checkboxBasic,
					label: 'Basic checkbox',
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ checkboxBasic: target.checked })
					},
					theme: dojoTheme
				}),
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Checkbox, {
					key: 'cb2',
					checked: checkboxToggle,
					label: 'Toggle checkbox',
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ checkboxToggle: target.checked })
					},
					theme: dojoTheme,
					mode: Mode.toggle
				})
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Radio, {
					key: 'r1',
					checked: radioValue === 'first',
					value: 'first',
					label: 'First option',
					name: 'sample-radios',
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ radioValue: target.value });
					},
					theme: dojoTheme
				}),
				w(Radio, {
					key: 'r2',
					checked: radioValue === 'second',
					value: 'second',
					label: 'Second option',
					name: 'sample-radios',
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ radioValue: target.value });
					},
					theme: dojoTheme
				}),
				w(Radio, {
					key: 'r3',
					checked: radioValue === 'third',
					value: 'third',
					label: 'Third option',
					name: 'sample-radios',
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ radioValue: target.value });
					},
					theme: dojoTheme
				})
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Tooltip, {
					key: 'tooltip',
					content: 'This is a right-oriented tooltip that opens and closes based on child click.',
					orientation: Orientation.right,
					open: tooltipOpen,
					theme: dojoTheme
				}, [
					w(Button, {
						key: 'tooltip-trigger',
						theme: dojoTheme,
						onClick: () => {
							this.setState({ tooltipOpen: !tooltipOpen });
						}
					}, [ 'Tooltip' ])
				])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(TextInput, {
					key: 'text-input',
					placeholder: 'TextInput',
					value: textinputValue,
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ textinputValue: target.value });
					},
					theme: dojoTheme
				}),
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(ComboBox, {
					key: 'combo-box',
					clearable: true,
					onChange: (value: string) => this.setState({ comboboxValue: value }),
					getResultLabel: (result: any) => result.value,
					onRequestResults: (value: string) => {
						const results = dataLarge.filter(item => {
							const match = item.value.toLowerCase().match(new RegExp('^' + value.toLowerCase()));
							return Boolean(match && match.length > 0);
						});

						this.setState({ comboboxResults: results });
					},
					openOnFocus: true,
					results: comboboxResults,
					value: comboboxValue,
					inputProperties: {
						placeholder: 'ComboBox'
					},
					theme: dojoTheme
				})
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(TimePicker, {
					key: 'time-picker',
					inputProperties: {
						placeholder: 'TimePicker'
					},
					onChange: (value: string) => {
						this.setState({ timepickerValue: value });
					},
					onRequestOptions: (value: string, options: TimeUnits[]) => {
						this.setState({ timepickerOptions: options });
					},
					openOnFocus: true,
					options: timepickerOptions,
					step: 1800,
					theme: dojoTheme,
					value: timepickerValue
				}),
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Select, {
					key: 'select',
					getOptionDisabled: (option: any) => option.disabled,
					getOptionLabel: (option: any) => option.label,
					getOptionValue: (option: any) => option.value,
					getOptionSelected: (option: any) => !!selectValue && option.value === selectValue,
					label: 'Native select',
					options: dataSmall,
					value: selectValue,
					theme: dojoTheme,
					onChange: (option: any) => {
						this.setState({ selectValue: option.value });
					}
				})
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Slider, {
					key: 'slider',
					value: sliderValue,
					outputIsTooltip: true,
					onInput: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ sliderValue: parseFloat(target.value) });
					},
					theme: dojoTheme
				})
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Textarea, {
					key: 'text-area',
					columns: 40,
					rows: 5,
					placeholder: 'Hello, World',
					value: textareaValue,
					onChange: (event: Event) => {
						const target = event.target as HTMLInputElement;
						this.setState({ textareaValue: target.value });
					},
					theme: dojoTheme
				}),
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(Calendar, {
					month,
					selectedDate,
					theme: dojoTheme,
					year,
					onMonthChange: (month: number) => {
						this.setState({ month });
					},
					onYearChange: (year: number) => {
						this.setState({ year });
					},
					onDateSelect: (date: Date) => {
						this.setState({ selectedDate: date });
					}
				})
			]),
			v('h1', [ 'Layout components' ]),
			v('div', { classes: this.theme(css.component) }, [
				w(Dialog, {
					key: 'dialog',
					title: 'Dialog',
					open: dialogOpen,
					underlay: true,
					closeable: true,
					onRequestClose: () => {
						this.setState({ dialogOpen: false })
					},
					theme: dojoTheme
				}, [
					`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.`
				]),
				w(Button, {
					key: 'dialog-button',
					theme: dojoTheme,
					onClick: () => this.setState({ dialogOpen: true })
				}, [ 'Open Dialog' ])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(SlidePane, {
					key: 'slide-pane',
					align: Align.right,
					onRequestClose: () => {
						this.setState({ slidepaneOpen: false })
					},
					open: slidepaneOpen,
					theme: dojoTheme,
					title: 'SlidePane',
					underlay: true
				}, [
					`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.`
				]),
				w(Button, {
					key: 'slidepane-button',
					theme: dojoTheme,
					onClick: () => this.setState({ slidepaneOpen: true })
				}, [ 'Open SlidePane' ])
			]),
			v('div', { classes: this.theme(css.component) }, [
				v('div', {
					classes: this.theme(css.splitContainer)
				}, [
					w(SplitPane, {
						key: 'split-pane',
						direction: Direction.row,
						onResize: (size: number) => {
							this.setState({ nestedSizeA: size });
						},
						size: nestedSizeA,
						theme: dojoTheme,
						trailing: w(SplitPane, {
							key: 'split-pane-child',
							direction: Direction.column,
							onResize: (size: number) => {
								this.setState({ nestedSizeB: size });
							},
							size: nestedSizeB,
							theme: dojoTheme
						})
					})
				])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(TitlePane, {
					key: 'title-pane',
					open: titlepaneOpen,
					theme: dojoTheme,
					title: 'TitlePane',
					onRequestClose: () => {
						this.setState({ titlepaneOpen: false })
					},
					onRequestOpen: () => {
						this.setState({ titlepaneOpen: true })
					}
				}, [
					v('div', [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in. <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.'
					])
				])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(AccordionPane, {
					onRequestOpen: (key: string) => {
						this._openAccordionKeys.add(key);
						this.invalidate();
					},
					onRequestClose: (key: string) => {
						this._openAccordionKeys.delete(key);
						this.invalidate();
					},
					openKeys: from(this._openAccordionKeys),
					theme: dojoTheme
				}, [
					w(TitlePane, {
						title: 'Pane 1',
						key: 'accordion-pane-1'
					}, [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales ante sed massa finibus, at euismod ex molestie. Donec sagittis ligula at lorem blandit imperdiet. Aenean sapien justo, blandit at aliquet a, tincidunt ac nulla. Donec quis dapibus est. Donec id massa eu nisl cursus ornare quis sit amet velit.' ]),
					w(TitlePane, {
						title: 'Pane 2',
						key: 'accordion-pane-2'
					}, [ 'Ut non lectus vitae eros hendrerit pellentesque. In rhoncus ut lectus id tempus. Cras eget mauris scelerisque, condimentum ante sed, vehicula tellus. Donec congue ligula felis, a porta felis aliquet nec. Nulla mi lorem, efficitur nec lectus vehicula, vehicula varius eros.' ])
				])
			]),
			v('div', { classes: this.theme(css.component) }, [
				w(TabController, {
					key: 'tab-controller',
					theme: dojoTheme,
					activeIndex: activeTabIndex,
					onRequestTabClose: (index: number, key: string) => {
						this.setState({ closedTabKeys: [...closedTabKeys, key] });
					},
					onRequestTabChange: (index: number, key: string) => {
						this._tabRefresh && this._tabRefresh.cancel();
						if (key === 'async') {
							this.setState({
								activeTabIndex: 2,
								loadingTab: true
							});
							this._tabRefresh = this.refreshTabData().then(() => {
								this.setState({ loadingTab: false });
							});
						}
						else {
							this.setState({ activeTabIndex: index });
						}
					}
				}, [
					w(Tab, {
						theme: dojoTheme,
						key: 'default',
						label: 'Default'
					}, [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in ex pharetra, iaculis turpis eget, tincidunt lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
					]),
					w(Tab, {
						theme: dojoTheme,
						disabled: true,
						key: 'disabled',
						label: 'Disabled'
					}, [
						'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
					]),
					w(Tab, {
						theme: dojoTheme,
						key: 'async',
						label: 'Async'
					}, [
						loadingTab ? 'Loading...' : 'Curabitur id elit a tellus consequat maximus in non lorem. Donec sagittis porta aliquam. Nulla facilisi. Quisque sed mauris justo. Donec eu fringilla urna. Aenean vulputate ipsum imperdiet orci ornare tempor.'
					]),
					!includes(closedTabKeys, 'closeable') ? w(Tab, {
						theme: dojoTheme,
						closeable: true,
						key: 'closeable',
						label: 'Closeable'
					}, [
						'Nullam congue, massa in egestas sagittis, diam neque rutrum tellus, nec egestas metus tellus vel odio. Vivamus tincidunt quam nisl, sit amet venenatis purus bibendum eget. Phasellus fringilla ex vitae odio hendrerit, non volutpat orci rhoncus.'
					]) : null,
					w(Tab, {
						theme: dojoTheme,
						key: 'foo',
						label: 'Foobar'
					}, [
						'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
					])
				])
			])
		]);
	}
}

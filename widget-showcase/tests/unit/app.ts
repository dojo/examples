import * as registerSuite from 'intern!object';
import harness from '@dojo/test-extras/harness';
import { findKey, replaceChild } from '@dojo/test-extras/support/d';
import { v, w } from '@dojo/widget-core/d';
import { assignProperties } from '@dojo/test-extras/support/d';

import dojoTheme from '@dojo/widgets/themes/dojo/theme';
import ComboBox from '@dojo/widgets/combobox/ComboBox';
import Button from '@dojo/widgets/button/Button';
import Slider from '@dojo/widgets/slider/Slider';
import SlidePane, { Align } from '@dojo/widgets/slidepane/SlidePane';
import Textarea from '@dojo/widgets/textarea/Textarea';
import Radio from '@dojo/widgets/radio/Radio';
import TextInput from '@dojo/widgets/textinput/TextInput';
import Checkbox, { Mode } from '@dojo/widgets/checkbox/Checkbox';
import Select from '@dojo/widgets/select/Select';
import Dialog from '@dojo/widgets/dialog/Dialog';
import SplitPane, { Direction } from '@dojo/widgets/splitpane/SplitPane';
import TitlePane from '@dojo/widgets/titlepane/TitlePane';
import TimePicker, { TimeUnits } from '@dojo/widgets/timepicker/TimePicker';
import Tab from '@dojo/widgets/tabcontroller/Tab';
import TabController from '@dojo/widgets/tabcontroller/TabController';

import * as sinon from 'sinon';

import App from '../../src/App';
import * as AppCSS from '../../src/styles/app.m.css';
import { dataLarge, dataSmall} from '../../src/data';

function expected(widget: any) {
	const children = [
		v('h1', [ 'Form components' ]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Button, {
				key: 'basic-button',
				theme: dojoTheme
			}, [ 'Basic' ])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Button, {
				key: 'popup-button',
				theme: dojoTheme,
				popup: {
					expanded: false,
					id: 'fakeId'
				}
			}, [ 'Popup' ]),
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Button, {
				key: 'pressed-button',
				theme: dojoTheme,
				pressed: false,
				onClick: widget.listener
			}, [ 'Toggle' ])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Checkbox, {
				key: 'cb1',
				checked: false,
				label: 'Basic checkbox',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Checkbox, {
				key: 'cb2',
				checked: false,
				label: 'Toggle checkbox',
				onChange: widget.listener,
				theme: dojoTheme,
				mode: Mode.toggle
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Radio, {
				key: 'r1',
				checked: true,
				value: 'first',
				label: 'First option',
				name: 'sample-radios',
				onChange: widget.listener,
				theme: dojoTheme
			}),
			w(Radio, {
				key: 'r2',
				checked: false,
				value: 'second',
				label: 'Second option',
				name: 'sample-radios',
				onChange: widget.listener,
				theme: dojoTheme
			}),
			w(Radio, {
				key: 'r3',
				checked: false,
				value: 'third',
				label: 'Third option',
				name: 'sample-radios',
				onChange: widget.listener,
				theme: dojoTheme
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(TextInput, {
				key: 'text-input',
				placeholder: 'TextInput',
				value: '',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(ComboBox, {
				key: 'combo-box',
				clearable: true,
				onChange: widget.listener,
				getResultLabel: (result: any) => result.value,
				onRequestResults: widget.listener,
				openOnFocus: true,
				results: [],
				value: '',
				inputProperties: {
					placeholder: 'ComboBox'
				},
				theme: dojoTheme
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(TimePicker, {
				key: 'time-picker',
				inputProperties: {
					placeholder: 'TimePicker'
				},
				onChange: widget.listener,
				onRequestOptions: widget.listener,
				openOnFocus: true,
				options: [],
				step: 1800,
				theme: dojoTheme,
				value: ''
			}),
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Select, {
				key: 'select',
				options: dataSmall,
				value: '',
				theme: dojoTheme,
				onChange: widget.listener
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Select, {
				key: 'multiselect',
				options: dataSmall,
				value: '',
				multiple: true,
				theme: dojoTheme,
				onChange: widget.listener
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Slider, {
				key: 'slider',
				value: undefined,
				outputIsTooltip: true,
				onInput: widget.listener,
				theme: dojoTheme
			})
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Textarea, {
				key: 'text-area',
				columns: 40,
				rows: 5,
				placeholder: 'Hello, World',
				value: '',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('h1', [ 'Layout components' ]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(Dialog, {
				key: 'dialog',
				title: 'Dialog',
				open: false,
				underlay: true,
				closeable: true,
				onRequestClose: widget.listener,
				theme: dojoTheme
			}, [
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.`
			]),
			w(Button, {
				key: 'dialog-button',
				theme: dojoTheme,
				onClick: widget.listener
			}, [ 'Open Dialog' ])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(SlidePane, {
				key: 'slide-pane',
				align: Align.right,
				onRequestClose: widget.listener,
				open: false,
				theme: dojoTheme,
				title: 'SlidePane',
				underlay: true
			}, [
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.`
			]),
			w(Button, {
				key: 'slidepane-button',
				theme: dojoTheme,
				onClick: widget.listener
			}, [ 'Open SlidePane' ])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			v('div', {
				classes: widget.classes(AppCSS.splitContainer)
			}, [
				w(SplitPane, {
					key: 'split-pane',
					direction: Direction.row,
					onResize: widget.listener,
					size: undefined,
					theme: dojoTheme,
					trailing: w(SplitPane, {
						key: 'split-pane-child',
						direction: Direction.column,
						onResize: widget.listener,
						size: undefined,
						theme: dojoTheme
					})
				})
			])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(TitlePane, {
				key: 'title-pane',
				open: false,
				theme: dojoTheme,
				title: 'TitlePane',
				onRequestClose: widget.listener,
				onRequestOpen: widget.listener
			}, [
				v('div', [
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in. <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id purus ipsum. Aenean ac purus purus. Nam sollicitudin varius augue, sed lacinia felis tempor in.'
				])
			])
		]),
		v('div', {
			classes: widget.classes(AppCSS.component)
		}, [
			w(TabController, {
				key: 'tab-controller',
				theme: dojoTheme,
				activeIndex: 0,
				onRequestTabClose: widget.listener,
				onRequestTabChange: widget.listener
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
					'Curabitur id elit a tellus consequat maximus in non lorem. Donec sagittis porta aliquam. Nulla facilisi. Quisque sed mauris justo. Donec eu fringilla urna. Aenean vulputate ipsum imperdiet orci ornare tempor.'
				]),
				w(Tab, {
					theme: dojoTheme,
					closeable: true,
					key: 'closeable',
					label: 'Closeable'
				}, [
					'Nullam congue, massa in egestas sagittis, diam neque rutrum tellus, nec egestas metus tellus vel odio. Vivamus tincidunt quam nisl, sit amet venenatis purus bibendum eget. Phasellus fringilla ex vitae odio hendrerit, non volutpat orci rhoncus.'
				]),
				w(Tab, {
					theme: dojoTheme,
					key: 'foo',
					label: 'Foobar'
				}, [
					'Sed nibh est, sollicitudin consectetur porta finibus, condimentum gravida purus. Phasellus varius fringilla erat, a dignissim nunc iaculis et. Curabitur eu neque erat. Integer id lacus nulla. Phasellus ut sem eget enim interdum interdum ac ac orci.'
				])
			])
		])
	];

	return v('div', {
		classes: widget.classes(AppCSS.content)
	}, children);
}

let widget: any;

registerSuite({
	name: 'Widget Showcase',

	beforeEach() {
		widget = harness(App);
	},

	afterEach() {
		widget.destroy();
	},

	'basic rendering'() {
		widget.expectRender(expected(widget), 'The DOM structure is correct');
	},

	'can toggle the toggle button'() {
		widget.callListener('onClick', {
			key: 'pressed-button'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'pressed-button')!, {
			pressed: true
		});

		widget.expectRender(expectedWidget, 'The toggle button is toggled on');
	},

	'can check the basic checkbox'() {
		widget.callListener('onChange', {
			key: 'cb1',
			args: [{
				target: {
					checked: true
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'cb1')!, {
			checked: true
		});

		widget.expectRender(expectedWidget, 'The basic checkbox is checked');
	},

	'can toggle the toggle checkbox'() {
		widget.callListener('onChange', {
			key: 'cb2',
			args: [{
				target: {
					checked: true
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'cb2')!, {
			checked: true
		});

		widget.expectRender(expectedWidget, 'The toggle-checkbox is checked');
	},

	'can check the radio button'() {
		widget.callListener('onChange', {
			key: 'r1',
			args: [{
				target: {
					value: 'first'
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'r1')!, {
			checked: true
		});

		widget.expectRender(expectedWidget, 'The first radio button is checked');

		widget.callListener('onChange', {
			key: 'r3',
			args: [{
				target: {
					value: 'third'
				}
			}]
		});

		assignProperties(findKey(expectedWidget, 'r1')!, {
			checked: false
		});

		assignProperties(findKey(expectedWidget, 'r3')!, {
			checked: true
		});

		widget.expectRender(expectedWidget, 'The third radio button is checked');
	},

	'can input text in the text input'() {
		widget.callListener('onChange', {
			key: 'text-input',
			args: [{
				target: {
					value: 'Some text...'
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'text-input')!, {
			value: 'Some text...'
		});

		widget.expectRender(expectedWidget, 'The text input value is set');
	},

	'combo box on change'() {
		widget.callListener('onChange', {
			key: 'combo-box',
			args: ['on change value']
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'combo-box')!, {
			value: 'on change value'
		});

		widget.expectRender(expectedWidget, 'The combo box input value is set');
	},

	'combo box results'() {
		widget.callListener('onRequestResults', {
			key: 'combo-box',
			args: ['new yor']
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'combo-box')!, {
			results: [{
				label: 'New York',
				value: 'New York'
			}]
		});

		widget.expectRender(expectedWidget, 'The combo box results are set');

		widget.callListener('onRequestResults', {
			key: 'combo-box',
			args: ['o']
		});

		assignProperties(findKey(expectedWidget, 'combo-box')!, {
			results: [{
				label: 'Ohio',
				value: 'Ohio'
			}, {
				label: 'Oklahoma',
				value: 'Oklahoma'
			}, {
				label: 'Oregon',
				value: 'Oregon'
			}]
		});

		widget.expectRender(expectedWidget, 'The combo box results are set');
	},

	'can change the time picker'() {
		widget.callListener('onChange', {
			key: 'time-picker',
			args: ['on change value']
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'time-picker')!, {
			value: 'on change value'
		});

		widget.expectRender(expectedWidget, 'The value is updated');

		widget.callListener('onRequestOptions', {
			key: 'time-picker',
			args: ['', [{
				hello: 'world'
			}]]
		});

		assignProperties(findKey(expectedWidget, 'time-picker')!, {
			options: [{
				hello: 'world'
			}]
		});

		widget.expectRender(expectedWidget, 'The options are updated');
	},

	'can change the select box'() {
		widget.callListener('onChange', {
			key: 'select',
			args: [{
				value: 'Hello there'
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'select')!, {
			value: 'Hello there'
		});

		widget.expectRender(expectedWidget, 'The select box is changed');
	},

	'can change the multi select'() {
		widget.callListener('onChange', {
			key: 'multiselect',
			args: [{
				value: 'New option value'
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'multiselect')!, {
			value: 'New option value'
		});

		widget.expectRender(expectedWidget, 'The multi select box is changed');
	},

	'can change the slider value'() {
		widget.callListener('onInput', {
			key: 'slider',
			args: [{
				target: {
					value: '2'
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		/*
			A workaround - https://github.com/dojo/test-extras/blob/42a94c2b711d6d8abece5ccf54e8ddb2f0cc2993/src/support/d.ts#L20 - VirtualDomProperties have an interface of: readonly value?: string;
		*/

		assignProperties(findKey(expectedWidget, 'slider')!, {
			value: 2
		} as any);

		widget.expectRender(expectedWidget, 'The slider value is set');
	},

	'can change the text area value'() {
		widget.callListener('onChange', {
			key: 'text-area',
			args: [{
				target: {
					value: 'some textarea value'
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'text-area')!, {
			value: 'some textarea value'
		});

		widget.expectRender(expectedWidget, 'The textarea value is set');
	},

	'can open and close a dialog'() {
		widget.callListener('onClick', {
			key: 'dialog-button'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'dialog')!, {
			open: true
		});

		widget.expectRender(expectedWidget, 'the dialog opens');

		widget.callListener('onRequestClose', {
			key: 'dialog'
		});

		assignProperties(findKey(expectedWidget, 'dialog')!, {
			open: false
		});

		widget.expectRender(expectedWidget, 'the dialog closes');
	},

	'can open and close a slide pane'() {
		widget.callListener('onClick', {
			key: 'slidepane-button'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'slide-pane')!, {
			open: true
		});

		widget.expectRender(expectedWidget, 'the slide pane opens');

		widget.callListener('onRequestClose', {
			key: 'slide-pane'
		});

		assignProperties(findKey(expectedWidget, 'slide-pane')!, {
			open: false
		});

		widget.expectRender(expectedWidget, 'the slide pane closes');
	},

	'can resize a split pane'() {
		widget.callListener('onResize', {
			key: 'split-pane',
			args: [5]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'split-pane')!, {
			size: 5
		});

		widget.expectRender(expectedWidget, 'The split pane size is set');
	},

	'can open and close a title pane'() {
		widget.callListener('onRequestOpen', {
			key: 'title-pane'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'title-pane')!, {
			open: true
		});

		widget.expectRender(expectedWidget, 'The title pane is open');

		widget.callListener('onRequestClose', {
			key: 'title-pane'
		});

		assignProperties(findKey(expectedWidget, 'title-pane')!, {
			open: false
		});

		widget.expectRender(expectedWidget, 'The title pane is closed');
	},

	'can close tabs'() {
		widget.callListener('onRequestTabClose', {
			key: 'tab-controller',
			args: [, 'closeable']
		});

		expected(widget);
		const expectedWidget = expected(widget);

		replaceChild(expectedWidget, '19,0,3', null);

		widget.expectRender(expectedWidget, 'The tab is removed');
	},

	async 'can change tabs'() {
		const clock = sinon.useFakeTimers();

		widget.callListener('onRequestTabChange', {
			key: 'tab-controller',
			args: [99]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'tab-controller')!, {
			activeIndex: 99
		});

		widget.expectRender(expectedWidget, 'The active tab was changed');

		widget.callListener('onRequestTabChange', {
			key: 'tab-controller',
			args: [55, 'async']
		});

		assignProperties(findKey(expectedWidget, 'tab-controller')!, {
			activeIndex: 2
		});

		replaceChild(expectedWidget, '19,0,2,0', 'Loading...');
		widget.expectRender(expectedWidget, 'The loading text displays');

		clock.tick(2000);

		// To clear the microtask queue
		await Promise.resolve();

		replaceChild(expectedWidget, '19,0,2,0', 'Curabitur id elit a tellus consequat maximus in non lorem. Donec sagittis porta aliquam. Nulla facilisi. Quisque sed mauris justo. Donec eu fringilla urna. Aenean vulputate ipsum imperdiet orci ornare tempor.');

		widget.expectRender(expectedWidget, 'Async tab was updated');
		clock.restore();
	}
});

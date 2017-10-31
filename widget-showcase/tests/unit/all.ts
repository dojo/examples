import * as registerSuite from 'intern!object';
import harness from '@dojo/test-extras/harness';
import { findKey, findIndex } from '@dojo/test-extras/support/d';
import { v, w } from '@dojo/widget-core/d';
import App from '../../src/App';
import * as AppCSS from '../../src/styles/app.m.css';
import { dataLarge, dataSmall} from '../../src/data';
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
import dojoTheme from '@dojo/widgets/themes/dojo/theme';
import Tab from '@dojo/widgets/tabcontroller/Tab';
import TabController from '@dojo/widgets/tabcontroller/TabController';
import { assignChildProperties, assignProperties } from '@dojo/test-extras/support/d';
import * as sinon from 'sinon';
import { includes } from '@dojo/shim/array';

function expected(widget: any) {
	return v('div', {
		classes: widget.classes(AppCSS.content)
	}, [
		v('h1', [ 'Form components' ]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Button, {
				key: 'basic-button',
				theme: dojoTheme
			}, [ 'Basic' ])
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Button, {
				key: 'popup-button',
				theme: dojoTheme,
				popup: { expanded: false, id: 'fakeId' }
			}, [ 'Popup' ]),
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Button, {
				key: 'pressed-button',
				theme: dojoTheme,
				pressed: false,
				onClick: widget.listener
			}, [ 'Toggle' ])
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Checkbox, {
				key: 'cb1',
				checked: false,
				label: 'Basic checkbox',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Checkbox, {
				key: 'cb2',
				checked: false,
				label: 'Toggle checkbox',
				onChange: widget.listener,
				theme: dojoTheme,
				mode: Mode.toggle
			})
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(TextInput, {
				key: 'text-input',
				placeholder: 'TextInput',
				value: '',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Select, {
				key: 'select',
				options: dataSmall,
				value: '',
				theme: dojoTheme,
				onChange: widget.listener
			})
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Select, {
				key: 'multiselect',
				options: dataSmall,
				value: '',
				multiple: true,
				theme: dojoTheme,
				onChange: widget.listener
			})
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Slider, {
				key: 'slider',
				value: undefined,
				outputIsTooltip: true,
				onInput: widget.listener,
				theme: dojoTheme
			})
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(SlidePane, {
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
			v('div', {
				classes: widget.classes(AppCSS.splitContainer)
			}, [
				w(SplitPane, {
					direction: Direction.row,
					onResize: widget.listener,
					size: undefined,
					theme: dojoTheme,
					trailing: w(SplitPane, {
						direction: Direction.column,
						onResize: widget.listener,
						size: undefined,
						theme: dojoTheme
					})
				})
			])
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(TitlePane, {
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
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(TabController, {
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
					false ? 'Loading...' : 'Curabitur id elit a tellus consequat maximus in non lorem. Donec sagittis porta aliquam. Nulla facilisi. Quisque sed mauris justo. Donec eu fringilla urna. Aenean vulputate ipsum imperdiet orci ornare tempor.'
				]),
				!includes([], 'closeable') ? w(Tab, {
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

registerSuite({
	name: 'Widget Showcase',

	'basic rendering'() {
		const widget = harness(App);
		widget.expectRender(expected(widget), 'The DOM structure is correct');
		widget.destroy();
	},

	'can toggle the toggle button'() {
		const widget = harness(App);

		widget.callListener('onClick', {
			key: 'pressed-button'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'pressed-button')!, {
			pressed: true
		});

		widget.expectRender(expectedWidget, 'The toggle button is toggled on');
		widget.destroy();
	},

	'can check the basic checkbox'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'can toggle the toggle checkbox'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'can check the radio button'() {
		const widget = harness(App);

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

		widget.destroy();
	},

	'can input text in the text input'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'combo box on change'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'combo box results'() {
		const widget = harness(App);

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

		widget.destroy();
	},

	'can change the time picker'() {
		const widget = harness(App);

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
			args: ['', [{hello: 'world'}]]
		});

		assignProperties(findKey(expectedWidget, 'time-picker')!, {
			options: [{hello: 'world'}]
		});

		widget.expectRender(expectedWidget, 'The options are updated');

		widget.destroy();
	},

	'can change the select box'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'can change the multi select'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'can change the slider value'() {
		const widget = harness(App);

		widget.callListener('onInput', {
			key: 'slider',
			args: [{
				target: {
					value: '33.101'
				}
			}]
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'slider')!, {
			value: 1
		});

		widget.expectRender(expectedWidget, 'The slider value is set');
		widget.destroy();
	},


	'can change the text area value'() {
		const widget = harness(App);

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
		widget.destroy();
	},

	'can open and close a dialog'() {
		const widget = harness(App);

		widget.callListener('onClick', {
			key: 'dialog-button'
		});

		expected(widget);
		const expectedWidget = expected(widget);

		assignProperties(findKey(expectedWidget, 'dialog')!, {
			open: true
		});

		// widget.callListener('onRequestClose', {
		// 	key: 'dialog'
		// });

		widget.expectRender(expectedWidget, 'the dialog opens');
		widget.destroy();
	}
});
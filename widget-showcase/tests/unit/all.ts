import * as registerSuite from 'intern!object';
import harness from '@dojo/test-extras/harness';
import { findKey } from '@dojo/test-extras/support/d';
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
import * as sinon from 'sinon';
import { includes } from '@dojo/shim/array';

function getTestData() {
	const widget = harness(App);

	const expected = v('div', {
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
				placeholder: 'TextInput',
				value: '',
				onChange: widget.listener,
				theme: dojoTheme
			}),
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(ComboBox, {
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
				value: undefined,
				outputIsTooltip: true,
				onInput: widget.listener,
				theme: dojoTheme
			})
		]),
		v('div', { classes: widget.classes(AppCSS.component) }, [
			w(Textarea, {
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

	return {widget, expected};
}

registerSuite({
	name: 'Widget Showcase',

	'basic rendering'() {
		const {widget, expected} = getTestData();
		widget.expectRender(expected);
		widget.destroy();
	}/*,

	'can toggle the toggle button'() {
		const {widget, expected} = getTestData();

		const setStateMock = sinon.stub();

		console.log({setStateMock});

		widget.callListener('onClick', {
			key: 'pressed-button',
			thisArg: {
				setState: setStateMock
			}
		});

		console.log({setStateMock});


		// widget.expectRender(mutated);

		widget.destroy();
	}
	*/
});
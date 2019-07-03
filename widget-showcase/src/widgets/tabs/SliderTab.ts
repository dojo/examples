import { create, w, v } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';
import Slider from '@dojo/widgets/slider';
import * as css from '../../styles/tabs.m.css';

const factory = create({ icache });

export default factory(function SliderTab({ middleware: { icache } }) {
	const horizontalValue = icache.get<number>('horizontal') || 50;
	const verticalValue = icache.get<number>('vertical') || 0;
	const verticalInvalid = verticalValue > 50;

	return v('div', { classes: css.root }, [
		v('h2', ['Text Areas']),
		v('div', [
			v('h3', {}, ['Horizontal slider, value: 50']),
			w(Slider, {
				key: 's1',
				label: 'How much do you like tribbles?',
				min: 0,
				max: 100,
				output: (value: number) => {
					if (value < 20) {
						return 'I am a Klingon';
					}
					if (value < 40) {
						return 'Tribbles only cause trouble';
					}
					if (value < 60) {
						return 'They\`re kind of cute';
					}
					if (value < 80) {
						return 'Most of my salary goes to tribble food';
					} else {
						return 'I permanently altered the ecology of a planet for my tribbles';
					}
				},
				step: 1,
				value: horizontalValue,
				onChange: (value: number) => {
					icache.set('horizontal', value);
				},
				onInput: (value: number) => {
					icache.set('horizontal', value);
				}
			}),
			v('h3', {}, ['Disabled slider, value: 30']),
			w(Slider, {
				label: 'Disabled Slider',
				min: 0,
				max: 100,
				step: 1,
				value: 30,
				disabled: true
			}),
			v('h3', {}, ['Vertical slider with validation']),
			w(Slider, {
				label: 'Vertical Slider with default properties. Anything over 50 is invalid:',
				value: verticalValue,
				vertical: true,
				invalid: verticalInvalid,
				output: (value: number) => {
					return v('span', {
						innerHTML: verticalInvalid ? value + ' !' : value + ''
					});
				},
				outputIsTooltip: true,
				onChange: (value: number) => {
					icache.set('vertical', value);
				},
				onInput: (value: number) => {
					icache.set('vertical', value);
				}
			})
		])
	]);
});

import { formatNumber } from '@dojo/framework/i18n/number';
import { create, v } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';

import * as css from '../styles/clock.m.css';
import nlsBundle from '../nls/main';

export interface ClockProperties {
	date: Date;
	labelKey: keyof typeof nlsBundle.messages;
	size: number;
}

function calculateAngle(angle: number) {
	return ((angle - 90) * Math.PI) / 180;
}

function getHandPosition(size: number, angle: number, innerRadius: number) {
	const radius = size / 2;
	return {
		x: radius + innerRadius * Math.cos(angle),
		y: radius + innerRadius * Math.sin(angle)
	};
}

function getHandAnimation(duration: number, size: number) {
	const center = size / 2;

	return v('animateTransform', {
		attributeName: 'transform',
		type: 'rotate',
		from: `0 ${center} ${center}`,
		to: `360 ${center} ${center}`,
		dur: `${duration}s`,
		repeatCount: 'indefinite'
	});
}

const factory = create({ i18n }).properties<ClockProperties>();

export default factory(function Clock({ properties, middleware: { i18n } }) {
	const { format } = i18n.localize(nlsBundle);
	const { labelKey, size, date, locale } = properties();
	const label = format(labelKey);
	const radius = size / 2;

	function renderHours() {
		const fontSize = size / 10;
		const padding = fontSize * 0.75;
		const radius = size / 2;
		const hours: any[] = [];

		for (let i = 1; i <= 12; i++) {
			const angle = calculateAngle(i * 30);
			const { x, y } = getHandPosition(size, angle, radius - padding);

			hours.push(
				v(
					'text',
					{
						classes: [css.hourText],
						'text-anchor': 'middle',
						x: `${x}`,
						y: `${y + padding / 2}`
					},
					[formatNumber(i, locale)]
				)
			);
		}

		return v('g', hours);
	}

	function renderHands() {
		const secondsAngle = calculateAngle(date.getSeconds() * 6);
		const minutesAngle = calculateAngle((date.getMinutes() + date.getSeconds() / 60) * 6);
		const hoursAngle = calculateAngle((date.getHours() + date.getMinutes() / 60) * 30);
		const radius = size / 2;

		const { x: hourX, y: hourY } = getHandPosition(size, hoursAngle, radius * 0.5);
		const { x: minuteX, y: minuteY } = getHandPosition(size, minutesAngle, radius * 0.75);
		const { x: secondX, y: secondY } = getHandPosition(size, secondsAngle, radius * 0.9);

		return v('g', [
			v(
				'line',
				{
					classes: [css.hand, css.hourHand],
					x1: `${radius}`,
					y1: `${radius}`,
					x2: `${hourX}`,
					y2: `${hourY}`
				},
				[getHandAnimation(12 * 60 * 60, size)]
			),
			v(
				'line',
				{
					classes: [css.hand, css.minuteHand],
					x1: `${radius}`,
					y1: `${radius}`,
					x2: `${minuteX}`,
					y2: `${minuteY}`
				},
				[getHandAnimation(60 * 60, size)]
			),
			v(
				'line',
				{
					classes: [css.hand, css.secondHand],
					x1: `${radius}`,
					y1: `${radius}`,
					x2: `${secondX}`,
					y2: `${secondY}`
				},
				[getHandAnimation(60, size)]
			),
			v('circle', {
				classes: [css.joint],
				cx: `${radius}`,
				cy: `${radius}`,
				r: `4`
			})
		]);
	}

	return v('div', [
		v(
			'svg',
			{
				classes: [css.clock],
				height: `${size}`,
				width: `${size}`
			},
			[
				v('circle', {
					cx: `${radius}`,
					cy: `${radius}`,
					r: `${radius}`
				}),
				renderHours(),
				renderHands()
			]
		),
		v(
			'p',
			{
				classes: [css.label]
			},
			[label]
		)
	]);
});

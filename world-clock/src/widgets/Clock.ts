import { formatNumber } from '@dojo/framework/i18n/number';
import { v } from '@dojo/framework/widget-core/d';
import { DNode } from '@dojo/framework/widget-core/interfaces';
import I18nMixin from '@dojo/framework/widget-core/mixins/I18n';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import WidgetBase from '@dojo/framework/widget-core/WidgetBase';

import * as css from '../styles/clock.m.css';
import nlsBundle from '../nls/main';

export interface ClockProperties {
	date: Date;
	labelKey: string;
	size: number;
}

@theme(css)
export default class Clock extends ThemedMixin(I18nMixin(WidgetBase))<ClockProperties> {
	protected render() {
		const { format } = this.localizeBundle(nlsBundle);
		const { labelKey, size } = this.properties;
		const label = format(labelKey);
		const radius = size / 2;

		return v('div', [
			v('svg', {
				classes: this.theme(css.clock),
				height: `${size}`,
				width: `${size}`
			}, [
				v('circle', {
					cx: `${radius}`,
					cy: `${radius}`,
					r: `${radius}`
				}),
				this._renderHours(),
				this._renderHands()
			]),
			v('p', {
				classes: this.theme(css.label)
			}, [ label ])
		]);
	}

	private _calculateAngle(angle: number) {
		return (angle - 90) * Math.PI / 180;
	}

	private _getHandAnimation(duration: number) {
		const { size } = this.properties;
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

	private _getHandPosition(angle: number, innerRadius: number) {
		const radius = this.properties.size / 2;
		return {
			x: radius + innerRadius * Math.cos(angle),
			y: radius + innerRadius * Math.sin(angle)
		};
	}

	private _renderHands() {
		const { date, size } = this.properties;
		const secondsAngle = this._calculateAngle(date.getSeconds() * 6);
		const minutesAngle = this._calculateAngle((date.getMinutes() + date.getSeconds() / 60) * 6);
		const hoursAngle = this._calculateAngle((date.getHours() + date.getMinutes() / 60) * 30);
		const radius = size / 2;

		const { x:hourX, y:hourY } = this._getHandPosition(hoursAngle, radius * 0.5);
		const { x:minuteX, y:minuteY } = this._getHandPosition(minutesAngle, radius * 0.75);
		const { x:secondX, y:secondY } = this._getHandPosition(secondsAngle, radius * 0.9);

		return v('g', [
			v('line', {
				classes: this.theme([ css.hand, css.hourHand ]),
				x1: `${radius}`,
				y1: `${radius}`,
				x2: `${hourX}`,
				y2: `${hourY}`
			}, [ this._getHandAnimation(12 * 60 * 60) ]),
			v('line', {
				classes: this.theme([ css.hand, css.minuteHand ]),
				x1: `${radius}`,
				y1: `${radius}`,
				x2: `${minuteX}`,
				y2: `${minuteY}`
			}, [ this._getHandAnimation(60 * 60) ]),
			v('line', {
				classes: this.theme([ css.hand, css.secondHand ]),
				x1: `${radius}`,
				y1: `${radius}`,
				x2: `${secondX}`,
				y2: `${secondY}`
			}, [ this._getHandAnimation(60) ]),
			v('circle', {
				classes: this.theme(css.joint),
				cx: `${radius}`,
				cy: `${radius}`,
				r: `4`
			})
		]);
	}

	private _renderHours() {
		const { locale, size } = this.properties;
		const fontSize = size / 10;
		const padding = fontSize * 0.75;
		const radius = size / 2;
		const hours: DNode[] = [];

		for (let i = 1; i <= 12; i++) {
			const angle = this._calculateAngle(i * 30);
			const { x, y } = this._getHandPosition(angle, radius - padding);

			hours.push(v('text', {
				classes: this.theme(css.hourText),
				'text-anchor': 'middle',
				x: `${x}`,
				y: `${y + padding / 2}`
			}, [ formatNumber(i, locale) ]));
		}

		return v('g', hours);
	}
}

const { afterEach, describe, it } = intern.getInterface('bdd');
import harness from '@dojo/test-extras/harness';

import i18n, { switchLocale, systemLocale } from '@dojo/i18n/i18n';
import { formatNumber } from '@dojo/i18n/number';
import { v, w } from '@dojo/widget-core/d';

import Clock, { ClockProperties } from '../../../src/widgets/Clock';
import * as css from '../../../src/styles/clock.m.css';
import bundle from '../../../src/nls/main';

import {
	fetchCldrData,
	getHourPosition,
	getHours,
	getSecondPosition,
	getMinutePosition
} from '../../support/util';

function getExpectedRender(properties: ClockProperties) {
	const { date, size } = properties;
	const radius = size / 2;

	return v('div', {
		dir: '',
		lang: null
	}, [
		v('svg', {
			classes: css.clock,
			height: `${size}`,
			width: `${size}`
		}, [
			v('circle', {
				cx: `${radius}`,
				cy: `${radius}`,
				r: `${radius}`
			}),
			v('g', getHours(radius).map(({ x, y }, i) => {
				return v('text', {
					classes: css.hourText,
					'text-anchor': 'middle',
					x,
					y
				}, [ formatNumber(i + 1) ]);
			})),
			v('g', [
				v('line', {
					classes: [ css.hand, css.hourHand ],
					x1: `${radius}`,
					y1: `${radius}`,
					...getHourPosition(date, radius)
				}, [
					v('animateTransform', {
						attributeName: 'transform',
						type: 'rotate',
						from: `0 ${radius} ${radius}`,
						to: `360 ${radius} ${radius}`,
						dur: `${12 * 60 * 60}s`,
						repeatCount: 'indefinite'
					})
				]),
				v('line', {
					classes: [ css.hand, css.minuteHand ],
					x1: `${radius}`,
					y1: `${radius}`,
					...getMinutePosition(date, radius)
				}, [
					v('animateTransform', {
						attributeName: 'transform',
						type: 'rotate',
						from: `0 ${radius} ${radius}`,
						to: `360 ${radius} ${radius}`,
						dur: `${60 * 60}s`,
						repeatCount: 'indefinite'
					})
				]),
				v('line', {
					classes: [ css.hand, css.secondHand ],
					x1: `${radius}`,
					y1: `${radius}`,
					...getSecondPosition(date, radius)
				}, [
					v('animateTransform', {
						attributeName: 'transform',
						type: 'rotate',
						from: `0 ${radius} ${radius}`,
						to: `360 ${radius} ${radius}`,
						dur: `${60}s`,
						repeatCount: 'indefinite'
					})
				]),
				v('circle', {
					classes: css.joint,
					cx: `${radius}`,
					cy: `${radius}`,
					r: `4`
				})
			])
		]),
		v('p', {
			classes: css.label
		}, [ 'القاهرة' ])
	]);
}

describe('Clock', () => {
	afterEach(() => {
		switchLocale(systemLocale);
	});

	it('should render widget', () => {
		return fetchCldrData([ 'ar' ]).then(() => {
			switchLocale('ar');
			return i18n(bundle, 'ar');
		}).then(() => {
			const properties = {
				date: new Date(),
				labelKey: 'cairo',
				size: 160
			};
			const h = harness(() => w(Clock, properties));
			h.expect(() =>
				getExpectedRender(properties)
			);
		});
	});
});

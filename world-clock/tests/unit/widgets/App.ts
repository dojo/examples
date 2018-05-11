const { afterEach, describe, it } = intern.getInterface('bdd');
import harness from '@dojo/test-extras/harness';

import * as moment from 'moment-timezone';
import i18n, { switchLocale, systemLocale } from '@dojo/i18n/i18n';
import { v, w } from '@dojo/widget-core/d';
import GlobalEvent from '@dojo/widgets/global-event';

import App from '../../../src/widgets/App';
import Clock from '../../../src/widgets/Clock';
import * as css from '../../../src/styles/app.m.css';
import bundle from '../../../src/nls/main';

const noop = function () {};
const cities = [
	{ key: 'mexicoCity', locale: 'es', tz: 'America/Mexico_City' },
	{ key: 'newYork', locale: 'en', tz: 'America/New_York' },
	{ key: 'london', locale: 'en', tz: 'Europe/London' },
	{ key: 'johannesburg', locale: 'en', tz: 'Africa/Johannesburg' },
	{ key: 'cairo', locale: 'ar', tz: 'Africa/Cairo' },
	{ key: 'paris', locale: 'fr', tz: 'Europe/Paris' },
	{ key: 'newDehli', locale: 'hi', tz: 'Asia/Colombo' },
	{ key: 'tokyo', locale: 'ja', tz: 'Asia/Tokyo' }
];
const languages = [
	{ key: 'arabic', locale: 'ar', name: 'عربى' },
	{ key: 'english', locale: 'en', name: 'English' },
	{ key: 'spanish', locale: 'es', name: 'Español' },
	{ key: 'french', locale: 'fr', name: 'Français' },
	{ key: 'hindi', locale: 'hi', name: 'हिंदी' },
	{ key: 'japanese', locale: 'ja', name: '日本語' }
];

function getLocalizedDate(date: Date, tz: string) {
	const {
		years,
		months,
		date:day,
		hours,
		minutes,
		seconds,
		milliseconds
	} = moment(date).tz(tz).toObject();

	return new Date(years, months, day, hours, minutes, seconds, milliseconds);
}

function getExpectedRender(messages: typeof bundle.messages) {
	const date = new Date();

	return w(GlobalEvent, { document: { visibilitychange: () => {} } }, [
		v('div', {
			dir: '',
			lang: null
		}, [
			v('div', {
				classes: css.formFields
			}, [
				v('div', {
					classes: css.formField
				}, [
					v('label', { 'for': 'language' }, [ messages.language ]),
					v('select', {
						id: 'language',
						onchange: noop
					}, languages.map((data) => {
						const language = (messages as any)[data.key];
						const label = i18n.locale.indexOf(data.locale) === 0 ?
							language :
							`${language} (${data.name})`;

						return v('option', {
							selected: i18n.locale.indexOf(data.locale) === 0,
							value: data.locale
						}, [ label ]);
					}))
				]),

				v('div', {
					classes: css.formField
				}, [
					v('label', { 'for': 'multipleLocales' }, [ messages.multipleLocales ]),
					v('input', {
						id: 'multipleLocales',
						type: 'checkbox',
						onchange: noop
					})
				])
			]),
			v('div', {
				classes: css.clocks
			}, cities.map((data) => {
				return w(Clock, {
					date: getLocalizedDate(date, data.tz),
					labelKey: data.key,
					key: data.key,
					locale: undefined,
					rtl: false,
					size: 160
				});
			}))
		])
	]);
}

function getDateComparators() {
	return cities.map(({ key, tz }) => {
		return {
			selector: `@${key}`,
			property: 'date',
			comparator: (date: Date) => {
				const now = getLocalizedDate(new Date(), tz);

				return date.getFullYear() === now.getFullYear() &&
					date.getMonth() === now.getMonth() &&
					date.getDate() === now.getDate() &&
					date.getHours() === now.getHours() &&
					Math.abs(date.getMinutes() - now.getMinutes()) < 3;
			}
		}
	});
}

describe('App', () => {
	afterEach(() => {
		switchLocale(systemLocale);
	});

	it('should render widget', () => {
		const h = harness(() => w(App, {}), getDateComparators());
		h.expect(() =>
			getExpectedRender(bundle.messages)
		);
	});

	it('should localize the clocks', () => {
		switchLocale('ar');
		return i18n(bundle, 'ar').then((messages) => {
			const h = harness(() => w(App, {}), getDateComparators());
			h.expect(() =>
				getExpectedRender(messages as any)
			);
		});
	});
});

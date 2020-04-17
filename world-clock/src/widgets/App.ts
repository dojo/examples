import { create, v, w, invalidator } from '@dojo/framework/core/vdom';
import i18n from '@dojo/framework/core/middleware/i18n';
import icache from '@dojo/framework/core/middleware/icache';
import GlobalEvent from '@dojo/widgets/global-event';

import * as moment from 'moment-timezone';

import * as css from '../styles/app.m.css';
import nlsBundle from '../nls/main';
import Clock from './Clock';

function getLocalizedDate(date: Date, tz: string) {
	const { years, months, date: day, hours, minutes, seconds, milliseconds } = moment(date).tz(tz).toObject();

	return new Date(years, months, day, hours, minutes, seconds, milliseconds);
}

interface City {
	key: keyof typeof nlsBundle.messages;
	locale: string;
	tz: string;
}

const cities: City[] = [
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

const factory = create({ i18n, invalidator, icache });

function isRtl(locale = '') {
	return /^ar(-.*)?$/.test(locale);
}

export default factory(function App({ properties, middleware: { i18n, invalidator, icache } }) {
	const { locale } = properties();
	const { messages } = i18n.localize(nlsBundle);
	const multiple = icache.get<boolean>('multiple') || false;
	const date = new Date();

	return w(
		GlobalEvent,
		{
			document: {
				visibilitychange: () => {
					if (!document.hidden) {
						invalidator();
					}
				}
			}
		},
		[
			v(
				'div',
				{
					lang: locale,
					dir: isRtl(locale) ? 'rtl' : 'ltr'
				},
				[
					v(
						'div',
						{
							classes: [css.formFields]
						},
						[
							v(
								'div',
								{
									classes: [css.formField]
								},
								[
									v('label', { classes: [css.label], for: 'language' }, [messages.language]),
									v(
										'select',
										{
											id: 'language',
											onchange: (event) => {
												const locale = event.target.options[event.target.selectedIndex].value;
												i18n.set({ locale, rtl: isRtl(locale) });
											}
										},
										languages.map((data) => {
											const language = (messages as any)[data.key];
											const label =
												locale && locale.indexOf(data.locale) === 0
													? language
													: `${language} (${data.name})`;

											return v(
												'option',
												{
													selected: locale && locale.indexOf(data.locale) === 0,
													value: data.locale
												},
												[label]
											);
										})
									)
								]
							),

							v(
								'div',
								{
									classes: [css.formField]
								},
								[
									v('label', { for: 'multipleLocales' }, [messages.multipleLocales]),
									v('input', {
										id: 'multipleLocales',
										type: 'checkbox',
										onchange: (event: Event) => {
											const input = event.target as HTMLInputElement;
											icache.set('multiple', input.checked);
										}
									})
								]
							)
						]
					),
					v(
						'div',
						{
							classes: [css.clocks]
						},
						cities.map(({ key, locale, tz }) => {
							return Clock({
								date: getLocalizedDate(date, tz),
								labelKey: key,
								key,
								locale: multiple ? locale : undefined,
								rtl: multiple && isRtl(locale),
								size: 160
							});
						})
					)
				]
			)
		]
	);
});

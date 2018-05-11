import i18n, { switchLocale } from '@dojo/i18n/i18n';
import { v, w } from '@dojo/widget-core/d';
import I18nMixin from '@dojo/widget-core/mixins/I18n';
import { theme, ThemedMixin } from '@dojo/widget-core/mixins/Themed';
import WidgetBase from '@dojo/widget-core/WidgetBase';
import GlobalEvent from '@dojo/widgets/global-event';

import * as moment from 'moment-timezone';

import * as css from '../styles/app.m.css';
import nlsBundle from '../nls/main';
import Clock from './Clock';

interface CityData {
	key: string;
	locale: string;
	tz: string;
}

interface LanguageData {
	key: string;
	locale: string;
	name: string;
}

export const AppBase = ThemedMixin(I18nMixin(WidgetBase));

@theme(css)
export default class App extends AppBase {
	private _multipleLocales: boolean = false;
	private _cities: CityData[] = [
		{ key: 'mexicoCity', locale: 'es', tz: 'America/Mexico_City' },
		{ key: 'newYork', locale: 'en', tz: 'America/New_York' },
		{ key: 'london', locale: 'en', tz: 'Europe/London' },
		{ key: 'johannesburg', locale: 'en', tz: 'Africa/Johannesburg' },
		{ key: 'cairo', locale: 'ar', tz: 'Africa/Cairo' },
		{ key: 'paris', locale: 'fr', tz: 'Europe/Paris' },
		{ key: 'newDehli', locale: 'hi', tz: 'Asia/Colombo' },
		{ key: 'tokyo', locale: 'ja', tz: 'Asia/Tokyo' }
	];
	private _languages: LanguageData[] = [
		{ key: 'arabic', locale: 'ar', name: 'عربى' },
		{ key: 'english', locale: 'en', name: 'English' },
		{ key: 'spanish', locale: 'es', name: 'Español' },
		{ key: 'french', locale: 'fr', name: 'Français' },
		{ key: 'hindi', locale: 'hi', name: 'हिंदी' },
		{ key: 'japanese', locale: 'ja', name: '日本語' }
	];

	private _onDocumentVisibilityChange() {
		if (!document.hidden) {
			this.invalidate();
		}
	}

	protected render() {
		const { messages } = this.localizeBundle(nlsBundle);

		return w(GlobalEvent, { document: { visibilitychange: this._onDocumentVisibilityChange } }, [
			v('div', {
				lang: i18n.locale,
				dir: i18n.locale.indexOf('ar-') === 0 ? 'rtl' : 'ltr'
			}, [
				this._renderFormInputs(messages),
				this._renderClocks()
			])
		]);
	}

	private _getLocalizedDate(date: Date, tz: string): Date {
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

	private _onLocaleSelect(event: Event) {
		const select = event.target as HTMLSelectElement;
		switchLocale(select.options[select.selectedIndex].value);
		this.invalidate();
	}

	private _onMultipleSelectChange(event: Event) {
		const input = event.target as HTMLInputElement;
		this._multipleLocales = input.checked;
		this.invalidate();
	}

	private _renderClocks() {
		const date = new Date();

		return v('div', {
			classes: this.theme(css.clocks)
		}, this._cities.map(({ key, locale, tz }: CityData) => {
			return w(Clock, {
				date: this._getLocalizedDate(date, tz),
				labelKey: key,
				key,
				locale: this._multipleLocales ? locale : undefined,
				rtl: this._multipleLocales && locale.indexOf('ar-') === 0,
				size: 160
			});
		}));
	}

	private _renderFormInputs(messages: typeof nlsBundle.messages) {
		return v('div', {
			classes: this.theme(css.formFields)
		}, [
			v('div', {
				classes: this.theme(css.formField)
			}, [
				v('label', { 'for': 'language' }, [ messages.language ]),
				v('select', {
					id: 'language',
					onchange: this._onLocaleSelect
				}, this._languages.map((data) => {
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
				classes: this.theme(css.formField)
			}, [
				v('label', { 'for': 'multipleLocales' }, [ messages.multipleLocales ]),
				v('input', {
					id: 'multipleLocales',
					type: 'checkbox',
					onchange: this._onMultipleSelectChange
				})
			])
		]);
	}
}

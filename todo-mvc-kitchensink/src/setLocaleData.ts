import loadCldrData from '@dojo/i18n/cldr/load';
import { switchLocale } from '@dojo/i18n/i18n';
import Promise from '@dojo/shim/Promise';

export type AppLocale = 'en' | 'en-PR';

export default function (locale: AppLocale = 'en') {
	switchLocale(locale);

	return Promise.all([
		loadCldrData({
			main: {
				[locale]: {}
			}
		}),
		loadCldrData([ './nls/cldr/likelySubtags.json' ])
	]);
}

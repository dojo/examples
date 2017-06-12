import loadCldrData from '@dojo/i18n/cldr/load';
import { switchLocale } from '@dojo/i18n/i18n';

export type AppLocale = 'en' | 'en-PR';

export default function (locale: AppLocale = 'en') {
	switchLocale(locale);
	return loadCldrData([ './nls/cldr/likelySubtags.json', 'cldr-data/supplemental/plurals.json' ]);
}

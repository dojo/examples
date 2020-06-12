export default {
	locales: {
		ar: () => import('./ar/main'),
		es: () => import('./es/main'),
		hi: () => import('./hi/main'),
		fr: () => import('./fr/main'),
		ja: () => import('./ja/main')
	},
	messages: {
		arabic: 'Arabic',
		english: 'English',
		french: 'French',
		hindi: 'Hindi',
		japanese: 'Japanese',
		language: 'Language',
		spanish: 'Spanish',

		cairo: 'Cairo',
		johannesburg: 'Johannesburg',
		london: 'London',
		mexicoCity: 'Mexico City',
		newDehli: 'New Dehli',
		newYork: 'New York',
		paris: 'Paris',
		tokyo: 'Tokyo',

		multipleLocales: 'Multiple Locales'
	}
};

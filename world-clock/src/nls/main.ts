export default {
	locales: {
		ar: () => require('./ar/main'),
		es: () => require('./es/main'),
		hi: () => require('./hi/main'),
		fr: () => require('./fr/main'),
		ja: () => require('./ja/main')
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
}

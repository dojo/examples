(<any> require).config({
	baseUrl: '../../',
	packages: [
		{ name: 'src', location: '_build/src' },
		{ name: '@dojo', location: 'node_modules/@dojo' },
		{ name: 'immutable', location: 'node_modules/immutable/dist', main: 'immutable' },
		{ name: 'maquette', location: 'node_modules/maquette/dist', main: 'maquette' }
	]
});

(<any> require)([ 'src/main' ], function () {
});

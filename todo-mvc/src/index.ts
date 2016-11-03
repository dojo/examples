(<any> require).config({
	baseUrl: '../../',
	packages: [
		{ name: 'src', location: '_build/src' },
		{ name: 'dojo-actions', location: 'node_modules/dojo-actions' },
		{ name: 'dojo-app', location: 'node_modules/dojo-app' },
		{ name: 'dojo-dom', location: 'node_modules/dojo-dom' },
		{ name: 'dojo-compose', location: 'node_modules/dojo-compose' },
		{ name: 'dojo-routing', location: 'node_modules/dojo-routing' },
		{ name: 'dojo-core', location: 'node_modules/dojo-core' },
		{ name: 'dojo-shim', location: 'node_modules/dojo-shim' },
		{ name: 'dojo-has', location: 'node_modules/dojo-has' },
		{ name: 'dojo-stores', location: 'node_modules/dojo-stores' },
		{ name: 'dojo-widgets', location: 'node_modules/dojo-widgets' },
		{ name: 'immutable', location: 'node_modules/immutable/dist', main: 'immutable' },
		{ name: 'maquette', location: 'node_modules/maquette/dist', main: 'maquette' },
		{ name: 'rxjs', location: 'node_modules/@reactivex/rxjs/dist/amd' }
	]
});

(<any> require)([ 'src/main' ], function () {});

(<DojoLoader.RootRequire> require).config({
	baseUrl: '../../',
	packages: [
		{ name: 'src', location: '_build/src' },
		{ name: 'dojo-actions', location: 'node_modules/dojo-actions/dist/umd' },
		{ name: 'dojo-app', location: 'node_modules/dojo-app/dist/umd' },
		{ name: 'dojo-dom', location: 'node_modules/dojo-dom/dist/umd' },
		{ name: 'dojo-compose', location: 'node_modules/dojo-compose/dist/umd' },
		{ name: 'dojo-routing', location: 'node_modules/dojo-routing/dist/umd' },
		{ name: 'dojo-core', location: 'node_modules/dojo-core/dist/umd' },
		{ name: 'dojo-shim', location: 'node_modules/dojo-shim/dist/umd' },
		{ name: 'dojo-has', location: 'node_modules/dojo-has/dist/umd' },
		{ name: 'dojo-widgets', location: 'node_modules/dojo-widgets/dist/umd' },
		{ name: 'immutable', location: 'node_modules/immutable/dist' },
		{ name: 'maquette', location: 'node_modules/maquette/dist' },
		{ name: 'rxjs', location: 'node_modules/@reactivex/rxjs/dist/amd' }
	],
	map: {
		'*': {
			'maquette/maquette': 'maquette/maquette.min',
			'immutable/immutable': 'immutable/immutable.min'
		}
	}
});

require([ 'src/main' ], function () {});

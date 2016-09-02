export const proxyPort = 9000;

// A fully qualified URL to the Intern proxy
export const proxyUrl = 'http://localhost:9000/';

// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
// specified browser environments in the `environments` array below as well. See
// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
// automatically
export const capabilities = {
	'browserstack.debug': false,
	project: 'Dojo 2',
	name: 'dojo-cli-example'
};

// Support running unit tests from a web server that isn't the intern proxy
export const initialBaseUrl: string | null = (function () {
	if (typeof location !== 'undefined' && location.pathname.indexOf('__intern/') > -1) {
		return '/';
	}
	return null;
})();

// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
// loader
export const loaders = {
	'host-node': 'dojo-loader'
};

// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
// can be used here
export const loaderOptions = {
	// Packages that should be registered with the loader in each testing environment
	packages: [
		{ name: 'src', location: '_build/src' },
		{ name: 'tests', location: '_build/tests' }
	]
};

// Non-functional test suite(s) to run in each browser
export const suites = [ 'tests/unit/all' ];

// A regular expression matching URLs to files that should not be included in code coverage analysis
export const excludeInstrumentation = /(?:node_modules|bower_components|tests)[\/\\]/;

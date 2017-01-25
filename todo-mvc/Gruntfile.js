module.exports = function (grunt) {

	var staticFiles = [ 'src/**/*.html', 'src/**/*.css' ];
	var testFiles = [ 'tests/support/index.html' ];

	require('grunt-dojo2').initConfig(grunt, {
		ts: {
			dist: {
				compilerOptions: {
					declaration: false
				}
			}
		},
		copy: {
			staticFiles: {
				expand: true,
				cwd: '.',
				src: staticFiles,
				dest: '<%= devDirectory %>'
			},
			testIndexFiles: {
				expand: false,
				flatten: true,
				cwd: '.',
				src: testFiles,
				dest: '<%= devDirectory %>src/index.html'
			}
		}
	});

	grunt.registerTask('dev', [
		"clean:typings",
		'typings',
		'tslint',
		'clean:dev',
		'dojo-ts:dev',
		'copy:staticFiles',
		'copy:testIndexFiles'
	]);

	grunt.registerTask('ci', [
		'intern:saucelabs'
	]);

};

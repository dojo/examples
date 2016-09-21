module.exports = function (grunt) {

	var staticFiles = [ 'src/**/*.html' ];

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
			}
		}
	});

	grunt.registerTask('dev', [
		"clean:typings",
		'typings',
		'tslint',
		'clean:dev',
		'ts:dev',
		'copy:staticFiles'
	]);

	grunt.registerTask('ci', [
		'intern:saucelabs'
	]);

};

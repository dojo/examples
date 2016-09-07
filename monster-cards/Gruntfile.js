module.exports = function (grunt) {

	var staticFiles = [ 'src/**/*.html' ];

	require('grunt-dojo2').initConfig(grunt, {
		copy: {
			staticFiles: {
				expand: true,
				cwd: '.',
				src: staticFiles,
				dest: '<%= devDirectory %>'
			}
		}
	});



	grunt.registerTask('dev', grunt.config.get('devTasks').concat(['copy:staticFiles']));
};

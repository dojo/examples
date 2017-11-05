module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt, {
		intern: {
			version: 4
		},
		copy: {
			staticDistFiles: {
				expand: true,
				cwd: 'src',
				src: [ './sayhello.js' ],
				dest: '<%= distDirectory %>'
			}
		}
		/* any custom configuration goes here */
	});

	grunt.registerTask('ci', [ 'test' ]);
	grunt.registerTask('dist', grunt.config.get('distTasks').concat(['copy:staticDistFiles']));
};

module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt, {
		/* any custom configuration goes here */
		intern: {
			options: {
				nodeOptions: [  ]
			}
		}
	});

	grunt.registerTask('ci', [
		'intern:node'
	]);
};

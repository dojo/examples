module.exports = function (grunt) {
	require('grunt-dojo2').initConfig(grunt, {
		intern: {
			version: 4
		}
	});

	grunt.registerTask('ci', [
		'intern:node'
	]);
};

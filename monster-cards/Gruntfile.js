module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');

	require('grunt-dojo2').initConfig(grunt, {
		stylus: {
			dist: {
				options: {},
				files: [ {
					expand: false,
					src: 'src/styles/stylus/app.styl',
					ext: '.css',
					dest: 'src/styles/css/app.css'
				} ]
			}
		}
	});

	grunt.registerTask('ci', [
		'intern:node',
		'intern:saucelabs'
	]);
};

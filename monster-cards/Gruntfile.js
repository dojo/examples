var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-postcss');
	var staticFiles = [
		'src/**/*.html',
		'src/styles/**/*.css',
		'src/styles/fonts/*',
		'src/images/**/*.png'
	];

	require('grunt-dojo2').initConfig(grunt, {
		copy: {
			staticFiles: {
				expand: true,
				cwd: '.',
				src: staticFiles,
				dest: '<%= devDirectory %>'
			}
		},
		stylus: {
			dev: {
				// options: {
				// 	'include css': true
				// },
				files: [ {
					expand: false,
					src: 'src/styles/theme/app.styl',
					ext: '.css',
					dest: '_build/src/styles/theme/app.css'
				} ]
			}
		},
		clean: {
			cssmodules: {
				src: [
					'src/styles/structural/_generated/*',
					'src/styles/structural/modules/*'
				]
			}
		},
		postcss: {
			options: {
				map: true,
				processors: [
					require('postcss-simple-vars')({
						variables: require('./src/styles/structural/common')
					}),
					require('postcss-modules')({
						getJSON: function(cssFileName, json) {
							var filename = path.basename(cssFileName, '.css');
							fs.writeFileSync(
								`src/styles/structural/modules/${ filename }.ts`,
								`/* tslint:disable:object-literal-key-quotes quotemark whitespace */\nexport default ${ JSON.stringify(json) };\n`
							);
						}
					})
				]
			},
			dev: {
				files: [ {
					expand: true,
					flatten: true,
					src: 'src/styles/structural/*.css',
					ext: '.css',
					dest: 'src/styles/structural/_generated/'
				} ]
			}
		}
	});
	
	var devTasks = grunt.config.get('devTasks');
	devTasks.unshift('clean:cssmodules', 'postcss:dev');
	grunt.registerTask('dev', devTasks.concat(['copy:staticFiles', 'stylus:dev']));

	grunt.registerTask('ci', [
		'intern:node',
		'intern:saucelabs'
	]);
};

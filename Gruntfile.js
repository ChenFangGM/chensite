// Gruntfile.js
module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// get the configuration info from package.json ----------------------------
		// this way we can use things like name and version (pkg.name)
		pkg: grunt.file.readJSON('package.json'),

		// Set project object
		project: {
			public: 'public',
			src: '<%= project.public %>/src',
			dist: '<%= project.public %>/dist',
			css: [
				'<%= project.src %>/scss'
			],
			js: [
				'<%= project.src %>/js'
			]
		},

		// Project banner
		tag: {
			banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * <%= pkg.url %>\n' +
				' * @author <%= pkg.author %>\n' +
				' * @version <%= pkg.version %>\n' +
				' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
				' */\n'
		},

		// all of our configuration will go here =====================================
		// Clean Combined Js File
		clean: ['<%= project.js %>/modules/timeline-module.js'],

		// Concatenate the timeline js files
		concat: {
			dist: {
				// Replace all 'use strict' statements in the code with a single one at the top
				options: {
					banner: "'use strict';\nangular.module('angular-timeline', []);\n",
					process: function(src, filepath) {
						return '// Source: ' + filepath + '\n' +
							src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
					}
				},
				src: ['<%= project.js %>/directives/timeline/*.js'],
				dest: '<%= project.js %>/modules/timeline-module.js'
			}
		},

		// configure jshint to validate js files -----------------------------------
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
			},
			// when this task is run, lint the Gruntfile and all js files in src
			all: [
				'<%= project.js %>/**/*.js',
				'!<%= project.js %>/tracking/*.js',
				'!<%= project.js %>/utilities/*.js'
			]
		},

		// configure uglify to minify js files -------------------------------------
		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
				beautify : true,
				mangle   : true
			},
			build: {
				files: {
					'<%= project.dist %>/js/app.min.js': ['<%= project.js %>/**/*.js']
				}
			}
		},

		// configure sass
		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: true
				},
				files: {
					'<%= project.dist %>/css/style.css': '<%= project.css %>/style.scss',
					'<%= project.dist %>/css/angular-timeline.css':'<%= project.css %>/angular-timeline.scss',
					'<%= project.dist %>/css/angular-timeline-bootstrap.css':'<%= project.css %>/angular-timeline-bootstrap.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					compass: true
				},
				files: {
					'<%= project.dist %>/css/style.css': '<%= project.css %>/style.scss',
					'<%= project.dist %>/css/angular-timeline.css':'<%= project.css %>/angular-timeline.scss',
					'<%= project.dist %>/css/angular-timeline-bootstrap.css':'<%= project.css %>/angular-timeline-bootstrap.scss'
				}
			}
		},

		// configure watch
		watch: {
			sass: {
				files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
				tasks: ['sass:dev']
			}
		},

		// configure nodemon
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},

		// run watch and nodemon at the same time
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['nodemon', 'watch']
		}

	});

	// register the nodemon task when we run grunt
	grunt.registerTask('default', ['clean', 'concat', 'sass:dev', 'jshint', 'uglify', 'concurrent']);

};
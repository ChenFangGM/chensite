// main.js

// config require
require.config({
	paths: {
		'require': 'libs/requirejs/require.js',
		'angular': 'libs/angular/angular.min',
		'angular-resource': 'libs/angular-resource/angular-resource.min',
		'domReady': 'libs/requirejs-domready/domReady',
		'angularRoute': 'libs/angular-route/angular-route.min',
		'ui-router': 'libs/angular-ui-router/release/angular-ui-router.min',
		'angularMocks': 'libs/angular-mocks/angular-mocks',
		'angularBootstrap': 'libs/angular-bootstrap/ui-bootstrap.min',
		'jquery': 'libs/jquery/dist/jquery.min',
		'jquery-ui': 'libs/jquery-ui/jquery-ui.min',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',

		'controller-manager': 'src/js/controllers/controller-manager',
		'controller-index': 'src/js/controllers/controller-index',
		'portfolio-controller': 'src/js/controllers/portfolio-controller',
		'unityObject2': 'src/js/utilities/UnityObject2',
		'mainPageUtility': 'src/js/utilities/main_page_utility',
		'timelineModule': 'src/js/modules/timeline-module',
		'portfolioController': 'src/js/controllers/portfolio-controller',
		'todoController': 'src/js/controllers/todo-controller',
		'todoService': 'src/js/services/todo-service',
		'datePickerController': 'src/js/controllers/datePicker-controller',
		'text': 'libs/requirejs-text/text',
		'app': 'app',
		'router': 'router'
	},
	// dependencies defined below
	shim: {
		'angular' : {'exports': 'angular'},
		'angular-resource': {deps: ['angular']},
		'ui-router': {deps: ['angular']},
		'angularBootstrap': {deps: ['angular']},
		'jquery-ui': {deps: ['jquery']}
	}
});

// bootstrap the app
require([
	'require',
	'angular',
	'app',
	'router',
	'mainPageUtility'
],function(require, angular){
	'use strict';
	require(['domReady!'], function(document){
		angular.bootstrap(document, ['mainApp']);
	});
});
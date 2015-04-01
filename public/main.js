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
		'jquery': 'libs/jquery/dist/jquery.min',
		'jquery-ui': 'libs/jquery-ui/jquery-ui.min',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',
		'ui-bootstrap': 'libs/angular-bootstrap/ui-bootstrap.min',

		'unityObject2': 'src/js/utilities/UnityObject2',
		'mainPageUtility': 'src/js/utilities/main_page_utility',
		'timelineModule': 'src/js/modules/timeline-module',
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
		'ui-bootstrap': {deps: ['angular']},
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
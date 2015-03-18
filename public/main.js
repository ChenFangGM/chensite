// running app
require.config({
	paths: {
		'jquery': 'libs/jquery/dist/jquery.min',
		'jquery-ui': 'libs/jquery-ui/jquery-ui.min',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',
		'angular': 'libs/angular/angular.min',
		'angular-resource': 'libs/angular-resource/angular-resource.min',
		'domReady': 'libs/requirejs-domready/domReady',
		'angularRoute': 'libs/angular-route/angular-route.min',
		'ui-router': 'libs/angular-ui-router/release/angular-ui-router.min',
		'angularMocks': 'libs/angular-mocks/angular-mocks',
		'angularBootstrap': 'libs/angular-bootstrap/ui-bootstrap.min',
		'unityWebHead': 'src/js/utility/unity_webplayer_head',
		'unityWebBody': 'src/js/utility/unity_webplayer_body',
		'mainPageUtility': 'src/js/utility/main_page_utility',
		'timelineModule': 'src/js/module/timeline-module',
		'galleryController': 'src/js/controller/gallery-controller',
		'todoController': 'src/js/controller/todo-controller',
		'todoService': 'src/js/service/todo-service',
		'datePickerController': 'src/js/controller/datePicker-controller',
		'text': 'libs/requirejs-text/text',
		'app': 'app'
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
	'angular',
	'app'
],function(angular){
	'use strict';
	require(['domReady!'], function(document){
		angular.bootstrap(document, ['mainApp']);
	});
});
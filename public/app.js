// app.js

define([
	'angular',
	'ui-router',
	'ui-bootstrap',
	'angular-cookies',
	'angular-resource',
	'src/js/controllers/controller-index',
	'src/js/services/service-index',
	'src/js/directives/directive-index'
	//'./filters/index',

], function (angular) {
	'use strict';
	var app = angular.module('chensiteApp', [
		'ui.router',
		'ui.bootstrap',
		'ngCookies',
		'ngResource',
		'controllerManager',
		'serviceManager',
		'directiveManager'
		//'app.filters',
	]);
	return app;
});
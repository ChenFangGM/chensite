// app.js

define([
	'angular',
	'ui-router',
	'ui-bootstrap',
	'angular-cookies',
	'angular-resource',
	'src/js/controllers/controller-index'
	//'./directives/index',
	//'./filters/index',
	//'./services/index'
], function (angular) {
	'use strict';
	var app = angular.module('chensiteApp', [
		'ui.router',
		'ui.bootstrap',
		'ngCookies',
		'ngResource',
		'controllerManager'
		//'app.services'
		//'app.filters',
		//'app.directives'
	]);
	return app;
});
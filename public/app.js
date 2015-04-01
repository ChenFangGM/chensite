// app.js

define([
	'angular',
	'ui-router',
	'ui-bootstrap',
	'src/js/controllers/controller-index'
	//'./directives/index',
	//'./filters/index',
	//'./services/index'
], function (angular) {
	'use strict';
	var app = angular.module('mainApp', [
		'ui.router',
		'ui.bootstrap',
		'controllerManager'
		//'app.services'
		//'app.filters',
		//'app.directives'
	]);
	return app;
});
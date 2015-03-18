// app.js

define([
	'angular',
	'ui-router',
	'controller-index'
	//'./directives/index',
	//'./filters/index',
	//'./services/index'
], function (angular) {
	'use strict';
	var app = angular.module('mainApp', [
		'ui.router',
		'controllerManager'
		//'app.services'
		//'app.filters',
		//'app.directives'
	]);
	return app;
});
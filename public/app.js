// js/app.js
'use strict';

var app = angular.module('galleryApp', [
	'ui.router',
	'angular-timeline',
	'ngRoute',
	'todoController',
	'todoService',
	'ui.bootstrap'
]);

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '',
		controller: 'galleryController',
		templateUrl: 'src/views/gallery.html'
	});
});
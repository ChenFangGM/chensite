// public/app.js
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
	$stateProvider
		// home page
		.state('home', {
			url: '',
			templateUrl: 'src/views/about.html'
		})
		// about page
		.state('about', {
			url: '/about',
			templateUrl: 'src/views/about.html'
		})
		// portfolio page
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: 'src/views/portfolio.html'
		});
});
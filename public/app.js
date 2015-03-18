// app.js
'use strict';

var app = angular.module('galleryApp', [
	'ui.router',
	'angular-timeline',
	'ngRoute',
	'todoController',
	'todoService',
	'ui.bootstrap',
	'portfolioController'
]);

app.config(function($stateProvider) {
	$stateProvider
		// home page
		.state('home', {
			url: '',
			templateUrl: 'src/view/about.html'
		})
		// about page
		.state('about', {
			url: '/about',
			templateUrl: 'src/view/about.html'
		})
		// portfolio page
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: 'src/view/portfolio.html',
			controller: 'portfolioController'
		});
});
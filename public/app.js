// app.js
define([
	'angular',
	'ui-router'
], function (angular) {
	'use strict';
	var myApp = angular.module('mainApp', ['ui.router']);
	myApp.config(function($stateProvider){
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
				templateUrl: 'src/view/portfolio.html'
			})
	});

	return myApp;
});
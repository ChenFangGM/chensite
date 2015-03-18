// router.js
define([
	'app'
], function (app) {
	'use strict';
	app.config(function($stateProvider){
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
			})
	});
});
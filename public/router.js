// router.js
define([
	'app'
], function (app) {
	'use strict';
	app.config(function($stateProvider, $urlRouterProvider){

		$urlRouterProvider.otherwise('');

		$stateProvider
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
				templateUrl: 'src/views/portfolio.html',
				controller: 'portfolioController'
			})
			// profile page
			.state('profile', {
				url: '/profile',
				templateUrl: 'src/views/profile.html'
			})
			.state('login-modal', {
				abstract: true,
				parent: 'home',
				url: '/modal',
				onEnter: ['$modal', '$state', function($modal, $state) {
					$modal.open({
						templateUrl: 'src/views/login-modal.html',
						backdrop: false,
						keyboard: false,
						windowClass: 'right fade',
						size: 'sm'
					}).result.finally(function() {
							$state.go('home');
						});
				}]
			})
			.state('login-modal.login', {
				url: '/login',
				parent: 'login-modal',
				views: {
					'login-modal@': {
						templateUrl: 'src/views/login.html'
					}
				}
			})
			.state('login-modal.signup', {
				url: '/signup',
				parent: 'login-modal',
				views: {
					'login-modal@': {
						templateUrl: 'src/views/signup.html',
						controller: 'signupController'
					}
				}
			});
	});
});
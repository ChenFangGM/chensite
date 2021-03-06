// router.js
define([
	'app'
], function (app) {
	'use strict';
	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'src/views/about.html'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'src/views/about.html'
			})
			.state('portfolio', {
				url: '/portfolio',
				templateUrl: 'src/views/portfolio.html',
				controller: 'portfolioController'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: 'src/views/profile.html',
				controller: 'profileController'
			})
			.state('login-modal', {
				abstract: true,
				url: '/modal',
				onEnter: function($modal, $state){
					$modal.open({
						templateUrl: 'src/views/login-modal.html',
						backdrop: true,
						keyboard: false,
						windowClass: 'right fade',
						size: 'sm'
					});
				}
			})
			.state('login-modal.login', {
				url: '/login',
				parent: 'login-modal',
				views: {
					'login-modal@': {
						templateUrl: 'src/views/login.html',
						controller: 'loginController'
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
// src/js/controller/login-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('loginController', function ($scope, Auth, $state){
		$scope.error = {};
		$scope.user = {};

		$scope.login = function(form) {
			Auth.login('password', {
					'email': $scope.user.email,
					'password': $scope.user.password
				},
				function(err) {
					$scope.errors = {};
					angular.forEach(err.errors, function(value, key) {
						form[key].$setValidity('mongoose', false);
						$scope.errors[key] = value.type;
					});
					$scope.error.other = err.message;
				},
				function() {
					$scope.errors = {};
					$scope.$close();
					$state.go('home');
				});
		};
	});
});

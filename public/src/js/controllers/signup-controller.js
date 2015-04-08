// src/js/controller/signup-controller.js
define([
	'./controller-manager',
	'jquery'
], function (controllerManager,JQuery) {
	'use strict';
	controllerManager.controller('signupController', function ($scope, $state, Auth) {
		$scope.register = function(form) {
			Auth.createUser({
					email: $scope.user.email,
					username: $scope.user.username,
					password: $scope.user.password
				},
				function(err) {
					$scope.errors = {};
					if (!err) {
						$state.go('home');
					} else {
						angular.forEach(err.errors, function(error, field) {
							form[field].$setValidity('mongoose', false);
							$scope.errors[field] = error.type;
						});
					}
				}
			);
		};
	});
});

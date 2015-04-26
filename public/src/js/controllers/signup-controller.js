// src/js/controller/signup-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('signupController', function ($scope, $rootScope, $state, Auth) {
		$scope.register = function(form) {
			Auth.createUser({
					'local':{
						'email': $scope.user.email,
						'username': $scope.user.username,
						'password': $scope.user.password
					}
				},
				// error cb action
				function(err) {
					$scope.errors = {};
					angular.forEach(err.errors, function(value, key) {
						form[key].$setValidity('mongoose', false);
						$scope.errors[key] = value.type;
					});
				},
				// success cb
				function(){
					$scope.errors = {};
					$scope.$close();
					$state.go('home');
				}
			);
		};
	});
});

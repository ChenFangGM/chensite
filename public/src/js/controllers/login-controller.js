// src/js/controller/login-controller.js

define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('loginController', function ($scope, Auth, $state){
		$scope.error = {};
		$scope.user = {};

		$scope.login = function(form) {
			Auth.login({
					'email': $scope.user.email,
					'password': $scope.user.password
				},
				function(err) {
					$scope.errors = {};
					if (!err) {
						$scope.$close();
						$state.go('home');
					} else {
						angular.forEach(err.errors, function (value, key) {
							if(key.indexOf('.') > -1){
								var extract = key.split('.');
								form[extract[1]].$setValidity('mongoose', false);
								$scope.errors[extract[1]] = value.message;
							}else{
								form[key].$setValidity('mongoose', false);
								$scope.errors[key] = value.message;
							}
						});
						$scope.error.other = err.message;
					}
				}
			);
		};
	});
});

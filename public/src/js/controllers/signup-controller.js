// src/js/controller/signup-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('signupController', function ($scope, $state, Auth) {
		$scope.register = function(form) {
			Auth.createUser({
					'local':{
						'email': $scope.user.email,
						'username': $scope.user.username,
						'password': $scope.user.password
					}
				},
				// callback for success and error
				function(err) {
					$scope.errors = {};
					if(!err){
						$scope.$close();
						$state.go('home');
					}else{
						angular.forEach(err.errors, function(value, key) {
							if(key.indexOf('.') > -1){
								var extract = key.split('.');
								form[extract[1]].$setValidity('mongoose', false);
								$scope.errors[extract[1]] = value.message;
							}else{
								form[key].$setValidity('mongoose', false);
								$scope.errors[key] = value.message;
							}
						});
					}
				}
			);
		};
	});
});

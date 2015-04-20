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
				function(err) {
					$scope.errors = {};
					if (!err) {
						$scope.$close();
					} else {
						angular.forEach(err.errors, function(error, field) {
							form[field].$setValidity('mongoose', false);
							$scope.errors[field] = error.type;
						});
					}
				}
			);
		};

		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				$scope.$dismiss();
			})
	});
});

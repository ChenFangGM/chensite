// src/js/controller/indexPage-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('indexPageController', function ($scope, $rootScope, $state, Auth) {
		// check user login status
		if(!$rootScope.currentUser){
			Auth.currentUser(function(err){
				if(!err){
					// success handler
				}else{
					// error handler
				}
			});
		}
		$scope.logout = function() {
			Auth.logout(function(err) {
				if(!err) {
					$state.go('home');
				}else{
					// error handler
				}
			});
		};
	});
});

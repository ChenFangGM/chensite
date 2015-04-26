// src/js/controller/indexPage-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('indexPageController', function ($scope, $log, $rootScope, $state, Auth) {
		// check user login status
		Auth.currentUser();
		$scope.logout = function() {
			Auth.logout(function(err) {
				if(!err) {
					$state.go('home');
				}
			});
		};
	});
});

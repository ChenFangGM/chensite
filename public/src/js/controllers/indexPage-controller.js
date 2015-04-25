// src/js/controller/indexPage-controller.js
define([
	'./controller-manager'
], function (controllerManager) {
	'use strict';
	controllerManager.controller('indexPageController', function ($scope, $rootScope, $state, Auth) {
		// check user login status
		Auth.currentUser();
	});
});

// src/js/services/session-service.js

define([
	'./service-manager'
], function(serviceManager){
	'use strict';
	serviceManager.factory('Session', function ($resource) {
		return $resource('/auth/session/');
	});
});

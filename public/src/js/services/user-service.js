// src/js/services/user-service.js

define([
	'./service-manager'
], function(serviceManager){
	'use strict';
	serviceManager.factory('User', function ($resource) {
		return $resource('/auth/user/:id', {},
			{
				'update': {
					method:'PUT'
				}
			});
	});
});
